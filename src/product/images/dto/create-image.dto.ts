import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductImageDTO{
  @IsNotEmpty()
  @IsString()
  imgPath:string

  @IsNotEmpty()
  @IsString()
  originalName:string
}