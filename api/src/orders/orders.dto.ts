import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { BaseDto } from '../common/dto/base.dto'

export class OrderDTO extends BaseDto {
  @IsNumber()
  @IsNotEmpty()
  total!: number
  @IsString({ })
  @IsNotEmpty()
  status!: string
}
