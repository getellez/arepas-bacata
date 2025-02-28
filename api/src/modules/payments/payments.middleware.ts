import { validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { HttpResponse } from '../../interfaces/common.interface'
import { PaymentsDTO } from './payments.dto'

export class PaymentMiddleware {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  userValidator(req: Request, res: Response, next: NextFunction) {
    const { amount, status, paymentMethod, orderId } = req.body

    const payload = new PaymentsDTO()

    payload.amount = amount
    payload.status = status
    payload.paymentMethod = paymentMethod
    payload.orderId = orderId

    validate(payload).then((errors) => {
      if (errors.length > 0) {
        return this.httpResponse.Error(res, `Validation Error: ${errors}`)
      }
      next()
    })
  }
}
