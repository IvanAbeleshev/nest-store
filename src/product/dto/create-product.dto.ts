import { CreateProductAmountDTO } from '../amount/dto/create-amount.dto'
import { CreateProductDescriptionDTO } from '../description/dto/create-description.dto'
import { CreateProductPriceDTO } from '../price/dto/create-price.dto'

export class CreateProductDTO{
  UID: string
  article?: string | null = null
  descriptions: CreateProductDescriptionDTO[] | null = null
  price: CreateProductPriceDTO | null = null
  amount: CreateProductAmountDTO | null = null
}