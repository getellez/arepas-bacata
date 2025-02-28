import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../interfaces/common.interface'
import { OrderDTO, OrderItemsDTO } from './orders.dto'

export class OrderMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  userValidator(req: Request, res: Response, next: NextFunction) {
    const { total, status, clientName } = req.body

    const payload = new OrderDTO()

    payload.total = total
    payload.status = status
    payload.clientName = clientName

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
    const { orderId, productId, productQuantity, totalPrice } = req.body

    const payload = new OrderItemsDTO()

    payload.orderId = orderId
    payload.productId = productId
    payload.productQuantity = productQuantity
    payload.totalPrice = totalPrice

    validate(payload).then((errors) => {
      if (errors.length > 0) {
        return this.httpResponse.Error(res, `Validation Error: ${errors}`)
      }
      next()
    })
  }
}
