import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './entities/comment.entity';
import { PostEntity } from '../post/entities/post.entity';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(CommentEntity)
        private readonly commentRepository: Repository<CommentEntity>) {
    }

    async create(createCommentDto: CreateCommentDto, postId: number): Promise<CommentEntity> {
        const comment = new CommentEntity({
            body: createCommentDto.body,
            post: new PostEntity({
                id: postId
            })
        });

        return this.commentRepository.save(comment);
    }

    async update(updateCommentDto: UpdateCommentDto, commentId: number): Promise<CommentEntity> {
        const entity = await this.commentRepository.findOneOrFail({
            where: {
                id: commentId
            },
            relations: {
                post: true
            }
        });

        return this.commentRepository.save({
            ...entity,
            ...updateCommentDto
        });
    }

    getById(id: number): Promise<CommentEntity | null> {
        return this.commentRepository.findOneBy({
            id: id
        });
    }

    getByPostId(id: number): Promise<CommentEntity[]> {
        return this.commentRepository.findBy({
            post: {
                id: id
            }
        });
    }
}
