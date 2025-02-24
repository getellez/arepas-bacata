import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator'
import { BaseDto } from '../common/dto/base.dto'

export class UserDTO extends BaseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  username!: string
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  firstName!: string
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  lastName!: string
  @IsEmail()
  @IsNotEmpty()
  email!: string
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  password!: string
  @IsString()
  @IsNotEmpty()
  role!: string
  @IsString()
  @MaxLength(15)
  @IsOptional()
  phoneNumer!: string
}
