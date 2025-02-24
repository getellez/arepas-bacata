import { Request, Response } from 'express'
import { PaymentsService } from './payments.service'

export class PaymentsController {
  constructor(
    private readonly paymentsService: PaymentsService = new PaymentsService()
  ) {}

  async findAllPayments(req: Request, res: Response) {
    try {
      const data = await this.paymentsService.findAllPayments()
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async findPaymentById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = await this.paymentsService.findPaymentById(id)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async createPayment(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.paymentsService.createPayment(payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deletePayment(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = await this.paymentsService.deletePayment(id)
      res.status(200).json(data)
    } catch (error) {}
  }

  async updatePayment(req: Request, res: Response) {
    try {
      const { id } = req.params
      const payload = req.body
      const data = await this.paymentsService.updatePayment(id, payload)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}
