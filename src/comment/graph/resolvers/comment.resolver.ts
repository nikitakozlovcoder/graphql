import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { CommentNode } from '../nodes/comment.node';
import { CommentService } from '../../comment.service';

@Resolver(() => CommentNode)
export class CommentResolver {
    constructor(private readonly commentService: CommentService) {
    }

    @Query(() => CommentNode)
    async comment(@Args('id', { type: () => Int }) id: number)
        : Promise<CommentNode | null> {
        const comment = await this.commentService.getById(id);

        return comment && {
            ...comment
        }
    }
}