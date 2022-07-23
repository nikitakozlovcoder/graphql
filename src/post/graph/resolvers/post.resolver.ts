import { PostNode } from '../nodes/post.node';
import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from '../../post.service';
import { CommentService } from '../../../comment/comment.service';
import { CommentNode } from '../../../comment/graph/nodes/comment.node';

@Resolver(() => PostNode)
export class PostResolver {
    constructor(
        private readonly postsService: PostService,
        private readonly commentsService: CommentService
    ) {}

    @Query(() => PostNode)
    post(@Args('id', { type: () => Int }) id: number)
        : Promise<PostNode | null> {
        return this.postsService.getById(id);
    }

    @ResolveField()
    comments(@Parent() post: PostNode) : Promise<CommentNode[]> {
        return this.commentsService.getByPostId(post.id);
    }
}