import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import CreatePostDto from './dto/createPost.dto';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { JwtAuthGuard } from '../auth/jwtAuth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BaseAuthController } from '../auth/baseAuthController';
import { REQUEST } from '@nestjs/core';
import { AuthRequest } from '../auth/authRequest';

@Controller('post')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class PostController extends BaseAuthController {
    constructor(private readonly postService: PostService,
                @Inject(REQUEST)
                readonly request: AuthRequest) {
        super(request);
    }

    @Post()
    create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
        return this.postService.create(createPostDto);
    }

    @Get()
    async getAll(): Promise<PostEntity[]> {
        return this.postService.getAll();
    }
}