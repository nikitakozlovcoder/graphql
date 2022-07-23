import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("User")
export class UserEntity {
    public constructor(init?: Partial<UserEntity>) {
        Object.assign(this, init);
    }
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    login: string;

    @Column()
    passwordHash: string;
}
