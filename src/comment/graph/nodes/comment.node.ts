import { Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class CommentNode{
    @Field(() => Int)
    id: number;

    @Field(() => String)
    body: string;

}