import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { languages } from "constants/languages"

export class CreateProductDescriptionDTO{
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  fullName: string

  @IsOptional()
  @IsString()
  description?: string | null = null  

  @IsNotEmpty()
  @IsString()
  @IsIn(languages)
  languageShortName: string
}