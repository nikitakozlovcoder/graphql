import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CommentEntity } from '../../comment/entities/comment.entity';

@Entity('Post')
export class PostEntity {
  public constructor(init?: Partial<PostEntity>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @OneToMany(() => CommentEntity, (x) => x.post)
  comments: CommentEntity[];
}
