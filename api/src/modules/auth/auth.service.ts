import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ConfigServer } from '../../common/config/config'
import { UserService } from '../users/user.service'
import { JwtTokenPayload } from './auth.interface'

export class AuthService extends ConfigServer {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly jwtInstance = jwt
  ) {
    super()
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email)
    if (!user) {
      return null
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return null
    }
    return Boolean(user)
  }

  signToken(payload: jwt.JwtPayload, secret: string) {
    return this.jwtInstance.sign(payload, secret, { expiresIn: '7d' })
  }

  async generateJWToken(payload: JwtTokenPayload): Promise<string> {
    const jwtPayload = { sub: payload.userId, ...payload }

    const jwtSecret = this.getEnvironment('JWT_SECRET')
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not found')
    }
    const accessToken = this.signToken(jwtPayload, jwtSecret)

    return accessToken
  }

  async login() {
    return 'login'
  }

  async register() {
    return 'register'
  }
}
