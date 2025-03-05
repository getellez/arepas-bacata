import { UsersEntity } from './user.entity'

export enum UserRoleTypes {
  ADMIN = 'admin',
  USER = 'user',
}

export type UserWithoutPassword = Omit<UsersEntity, 'password'>
