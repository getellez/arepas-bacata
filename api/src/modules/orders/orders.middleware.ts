import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../interfaces/common.interface'
import { OrderDTO, OrderItemsDTO } from './orders.dto'

export class OrderMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  userValidator(req: Request, res: Response, next: NextFunction) {
    const payload = new OrderDTO()
    Object.assign(payload, req.body)
    validate(payload).then((errors) => {
      if (errors.length > 0) {
        return this.httpResponse.Error(res, `Validation Error: ${errors}`)
      }
      next()
    })
  }
}

export class OrderItemsMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  userValidator(req: Request, res: Response, next: NextFunction) {
    const payload = new OrderItemsDTO()
    Object.assign(payload, req.body)
    validate(payload).then((errors) => {
      if (errors.length > 0) {
        return this.httpResponse.Error(res, `Validation Error: ${errors}`)
      }
      next()
    })
  }
}
