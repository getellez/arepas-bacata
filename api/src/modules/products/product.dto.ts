import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { BaseDto } from '../common/dto/base.dto'

export class ProductDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string
  @IsNumber()
  @IsNotEmpty()
  price!: number
  @IsOptional()
  @IsString()
  @MaxLength(255)
  description!: string
  @IsOptional()
  @IsString()
  image!: string
}
