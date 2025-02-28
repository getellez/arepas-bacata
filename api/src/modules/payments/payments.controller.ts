import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../common/interfaces/common.interface'
import { PaymentsService } from './payments.service'

export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService = new PaymentsService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async findAllPayments(req: Request, res: Response) {
    try {
      const data = await this.paymentsService.findAllPayments()
      if (!data.length) {
        this.httpResponse.NotFound(res, 'Payments not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async findPaymentById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = await this.paymentsService.findPaymentById(id)
      if (!data) {
        this.httpResponse.NotFound(res, 'Payment not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async createPayment(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.paymentsService.createPayment(payload)
      this.httpResponse.Created(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async deletePayment(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data: DeleteResult = await this.paymentsService.deletePayment(id)
      if (!data.affected) {
        this.httpResponse.NotFound(res, 'Payment not found')
        return
      }
      this.httpResponse.Ok(res, 'Payment deleted successfully')
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async updatePayment(req: Request, res: Response) {
    try {
      const { id } = req.params
      const payload = req.body
      const data: UpdateResult = await this.paymentsService.updatePayment(
        id,
        payload
      )
      if (!data.affected) {
        this.httpResponse.NotFound(res, 'Payment not found')
        return
      }
      this.httpResponse.Ok(res, 'Payment updated successfully')
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
}
