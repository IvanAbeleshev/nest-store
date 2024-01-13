import { IsNumber, IsPositive } from "class-validator"

export class CreateProductPriceDTO{
  @IsNumber()
  @IsPositive()
  price: number

  @IsNumber()
  discount:number
}