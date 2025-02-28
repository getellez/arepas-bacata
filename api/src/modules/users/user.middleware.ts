import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../interfaces/common.interface'
import { UserDTO } from './user.dto'

export class UserMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  userValidator(req: Request, res: Response, next: NextFunction) {
    const { username, firstName, lastName, email, password, role, phoneNumer } =
      req.body

    const valid = new UserDTO()

    valid.firstName = firstName
    valid.lastName = lastName
    valid.username = username
    valid.email = email
    valid.password = password
    valid.role = role
    valid.phoneNumer = phoneNumer

    validate(valid).then((errors) => {
      if (errors.length > 0) {
        return this.httpResponse.BadRequest(res, `Validation Error: ${errors}`)
      }
      next()
    })
  }
}
