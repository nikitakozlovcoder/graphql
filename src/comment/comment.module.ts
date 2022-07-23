import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PostEntity} from "../post/entities/post.entity";
import {CommentEntity} from "./entities/comment.entity";
import { CommentResolver } from './graph/resolvers/comment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CommentEntity])],
  exports: [TypeOrmModule, CommentService],
  controllers: [CommentController],
  providers: [CommentService, CommentResolver],
})
export class CommentModule {}
