import { IsNumber } from "class-validator";

export class CreateProductAmountDTO{
  @IsNumber()
  amount: number = 0
}