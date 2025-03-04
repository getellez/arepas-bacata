import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { BaseDto } from '../../common/dto/base.dto'

export class OrderDTO extends BaseDto {
  @IsNumber()
  @IsNotEmpty()
  total!: number
  @IsString({})
  @IsNotEmpty()
  status!: string
  @IsString()
  @IsOptional()
  clientName!: string
}

export class OrderItemsDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  orderId!: string
  @IsString()
  @IsNotEmpty()
  productId!: string
  @IsNumber()
  @IsNotEmpty()
  productQuantity!: number
  @IsNumber()
  @IsNotEmpty()
  totalPrice!: number
}
