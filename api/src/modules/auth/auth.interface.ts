import { UserRoleTypes } from '../users/users.interface'

export interface JwtTokenPayload {
  userId: string
  email: string
  role: UserRoleTypes
  permissions: {}
}
