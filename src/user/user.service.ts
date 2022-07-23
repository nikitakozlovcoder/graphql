import {forwardRef, HttpException, Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {UserEntity} from "./entities/user.entity";
import {AuthService} from "../auth/auth.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserTokenDto} from "../auth/dto/user-token.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UserService {
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>) {}

    async register(createUserDto: CreateUserDto): Promise<UserEntity> {
        const passwordHash = await this.authService.hashPassword(createUserDto.password);
        const user = new UserEntity({
            login: createUserDto.login,
            passwordHash: passwordHash
        });

        return this.userRepository.save(user);
    }

    async login(loginUserDto: LoginUserDto): Promise<UserTokenDto> {
        const user = await this.userRepository.findOne({
            where: {
                login: loginUserDto.login
            }
        });

        if (!user){
            throw new HttpException("Invalid credentials", 403);
        }

        const isValidPassword = await this.authService.comparePassword(loginUserDto.password, user.passwordHash);
        if (!isValidPassword){
            throw new HttpException("Invalid credentials", 403);
        }

        return this.authService.generateToken(user.id);
    }

    getById(userId: number): Promise<UserEntity | null> {
        return this.userRepository.findOne({
            where: {
                id: userId
            }
        });
    }
}
