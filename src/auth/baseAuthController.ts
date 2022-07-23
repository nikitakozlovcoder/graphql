import {AuthRequest} from "./authRequest";
import {UserEntity} from "../user/entities/user.entity";
import { HttpException } from '@nestjs/common';

export class BaseAuthController{
    constructor(protected readonly request: AuthRequest) {}

    protected getUser(): UserEntity {
        if (!this.request.user){
            throw new HttpException('Unknown user', 500);
        }

        return this.request.user;
    }
}