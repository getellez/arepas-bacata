import {
  ExtractJwt,
  Strategy as PassportJWTStrategy,
  StrategyOptionsWithSecret,
} from 'passport-jwt'
import { Strategy as LocalStrategy, VerifyFunction } from 'passport-local'
import { JwtTokenPayload } from './auth.interface'
import { AuthService } from './auth.service'
import { PassportUse } from './auth.utils'

const authService = new AuthService()

export class LoginStrategy {
  async validate(email: string, password: string, done: any) {
    const user = await authService.validateUser(email, password)
    if (!user) {
      return done(null, false, { message: 'Invalid email or password' })
    }
    return done(null, user)
  }

  get use() {
    return PassportUse<LocalStrategy, Object, VerifyFunction>(
      'login',
      LocalStrategy,
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      this.validate
    )
  }
}

export class JwtStrategy extends AuthService {
  async validate(payload: JwtTokenPayload, done: any) {
    return done(null, payload)
  }

  get use() {
    const jwtSecret = this.getEnvironment('JWT_SECRET')
    if (!jwtSecret) {
      throw new Error('JWT_SECRET not found')
    }
    // return passport.use('jwt', new PassportJWTStrategy(params, callback))
    return PassportUse<
      PassportJWTStrategy,
      StrategyOptionsWithSecret,
      (payload: JwtTokenPayload, done: any) => Promise<JwtTokenPayload>
    >(
      'jwt',
      PassportJWTStrategy,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtSecret,
      },
      this.validate
    )
  }
}
