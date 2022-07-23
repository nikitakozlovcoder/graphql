import {
  Controller,
  Post,
  Body, Param, ParseIntPipe, Put
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import {CommentEntity} from "./entities/comment.entity";
import {UpdateCommentDto} from "./dto/update-comment.dto";

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post(':postId')
  create(@Param('postId', ParseIntPipe) postId: number, @Body() createCommentDto: CreateCommentDto): Promise<CommentEntity> {
    return this.commentService.create(createCommentDto, postId);
  }

  @Put(':commentId')
  update(@Param('commentId', ParseIntPipe) commentId: number, @Body() updateCommentDto: UpdateCommentDto): Promise<CommentEntity> {
    return this.commentService.update(updateCommentDto, commentId);
  }
}
