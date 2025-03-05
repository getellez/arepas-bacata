import { Request, Response } from 'express'
import { SEVEN_DAYS_MILISECONDS } from '../../common/common.constants'
import { HttpResponse } from '../../interfaces/common.interface'
import { JwtTokenPayload } from './auth.interface'
import { AuthService } from './auth.service'

export class AuthController extends AuthService {
  constructor(private readonly httpResponse = new HttpResponse()) {
    super()
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await this.validateUser(email, password)
      if (!user) {
        this.httpResponse.Unauthorized(res, 'Invalid email or password')
        return
      }
      const permissions = '*'
      const plan = '*'
      const payload: JwtTokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role,
        permissions: permissions,
        plan: plan,
      }
      const accessToken = await this.generateJWToken(payload)
      res.header('Content-Type', 'application/json')
      res.cookie('accessToken', accessToken, { maxAge: SEVEN_DAYS_MILISECONDS })
      this.httpResponse.Ok(res, { accessToken, user })
      return
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
}
