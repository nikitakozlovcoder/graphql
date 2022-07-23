import {forwardRef, Inject, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'
import {UserTokenDto} from "./dto/user-token.dto";
import {ConfigService} from "@nestjs/config";
import {TokenPayloadDto} from "./dto/token-payload.dto";
import {UserEntity} from "../user/entities/user.entity";
import {UserService} from "../user/user.service";
import { ConfigEnum } from '../config.enum';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
        private readonly configService: ConfigService) {}

    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 2);
    }

    comparePassword(password: string, hash: string): Promise<boolean> {
       return bcrypt.compare(password, hash);
    }

    generateToken(id: number): UserTokenDto {
        const secret = this.configService.getOrThrow<string>(ConfigEnum.jwt_secret);
        const payload: TokenPayloadDto = {
            userId: id
        };

        const token = jwt.sign(payload, secret);
        return {
            token: token
        };
    }

    getUserFromJwt(token: string): Promise<UserEntity | null> {
        const payload = jwt.decode(token, {
            json: true
        }) as TokenPayloadDto;

        return payload && this.userService.getById(payload.userId);
    }
}
