import {AuthRequest} from "./authRequest";
import {UserEntity} from "../user/entities/user.entity";

export class BaseAuthController{
    constructor(protected readonly request: AuthRequest) {}

    protected getUser(): UserEntity | null {
        return this.request.user;
    }
}