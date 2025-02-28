import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { BaseDto } from '../../common/dto/base.dto'

export class PaymentsDTO extends BaseDto {
  @IsNumber()
  @IsNotEmpty()
  amount!: number
  @IsString()
  @IsNotEmpty()
  status!: string
  @IsString()
  @IsNotEmpty()
  paymentMethod!: string
  @IsString()
  @IsNotEmpty()
  oder_id!: string
}
