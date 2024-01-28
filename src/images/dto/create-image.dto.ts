import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageDTO{
  @IsNotEmpty()
  @IsString()
  imgPath:string

  @IsNotEmpty()
  @IsString()
  originalName:string
}