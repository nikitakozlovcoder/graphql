import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';
import { CommentEntity } from '../comment/entities/comment.entity';
import {AuthModule} from "../auth/auth.module";
import { PostResolver } from './graph/resolvers/post.resolver';
import { CommentModule } from '../comment/comment.module';

@Module({
  imports: [
      TypeOrmModule.forFeature([PostEntity, CommentEntity]),
      AuthModule,
      CommentModule
  ],
  exports: [TypeOrmModule],
  controllers: [PostController],
  providers: [PostService, PostResolver],
})
export class PostModule {}
