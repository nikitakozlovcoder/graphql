import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommentNode } from '../../../comment/graph/nodes/comment.node';

@ObjectType()
export class PostNode {

    @Field(() => Int)
    id: number;

    @Field(() => String)
    title: string;

    @Field(() => String)
    body: string;

    @Field(() => [CommentNode])
    comments: CommentNode[];
}