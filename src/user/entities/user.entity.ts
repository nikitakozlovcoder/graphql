import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PostEntity } from '../../post/entities/post.entity';
import { Exclude } from 'class-transformer';

@Entity("User")
export class UserEntity {

    public constructor(init?: Partial<UserEntity>) {
        Object.assign(this, init);
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Exclude()
    @Column()
    passwordHash: string;

    @OneToMany(()=> PostEntity, (x) => x.createdBy)
    posts: PostEntity[]
}
