import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../interfaces/common.interface'
import { ProductDTO } from './product.dto'

export class ProductMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async userValidator(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = new ProductDTO()
      Object.assign(payload, req.body)
      const errors = await validate(payload)
      if (errors.length > 0) {
        this.httpResponse.BadRequest(res, errors)
        return
      }
      next()
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
}
