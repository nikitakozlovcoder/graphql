import { IsNotEmpty } from 'class-validator';

export default class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;
}



