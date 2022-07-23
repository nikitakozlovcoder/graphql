import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreatePostDto from './dto/createPost.dto';
import { PostEntity } from './entities/post.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  getById(id: number) : Promise<PostEntity | null> {
      return this.postRepository.findOne({
        where: {
          id: id
        }
      })
  }
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(createPostDto: CreatePostDto, createdBy: UserEntity): Promise<PostEntity> {
    return this.postRepository.save(
      new PostEntity({
        title: createPostDto.title,
        body: createPostDto.body,
        createdBy: createdBy
      }),
    );
  }

  getAll(): Promise<PostEntity[]> {
    return this.postRepository.find({
      relations: {
        comments: true,
        createdBy: true
      },
    });
  }
}
