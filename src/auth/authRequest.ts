import {Request} from "express";
import {UserEntity} from "../user/entities/user.entity";
export type AuthRequest = Request & {user: UserEntity | null}