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
      const { name, price, description, image } = req.body

      const payload = new ProductDTO()

      payload.name = name
      payload.price = price
      payload.description = description
      payload.image = image

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
