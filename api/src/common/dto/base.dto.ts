import { IsDate, IsOptional, IsUUID } from 'class-validator'

export class BaseDto {
  @IsOptional()
  @IsUUID()
  id!: number
  @IsDate()
  @IsOptional()
  createdAt!: Date
  @IsDate()
  @IsOptional()
  updatedAt!: Date
}
