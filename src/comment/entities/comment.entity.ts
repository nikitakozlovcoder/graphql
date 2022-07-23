import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../post/entities/post.entity';

@Entity('Comment')
export class CommentEntity {
  public constructor(init?: Partial<CommentEntity>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @ManyToOne(() => PostEntity, (x) => x.comments)
  post: PostEntity;
}
