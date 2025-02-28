import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'
import { BaseDto } from '../../common/dto/base.dto'

export class CategoriesDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string
  @IsString()
  @IsOptional()
  @MaxLength(100)
  description!: string
}
