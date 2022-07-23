import { Controller, Post, Body} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import {UserEntity} from "./entities/user.entity";
import {UserTokenDto} from "../auth/dto/user-token.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto): Promise<UserTokenDto> {
    return this.userService.login(loginUserDto);
  }


}
