import { BaseRouter } from '../../common/router/base.router'
import { PaymentsController } from './payments.controller'

export class PaymentsRouter extends BaseRouter<PaymentsController> {
  constructor() {
    super(PaymentsController)
  }

  routes(): void {
    this.router.get('/v1/payments', (req, res) =>
      this.controller.findAllPayments(req, res)
    )
    this.router.get('/v1/payments/:id', (req, res) =>
      this.controller.findPaymentById(req, res)
    )
    this.router.delete('/v1/payments/:id', (req, res) =>
      this.controller.deletePayment(req, res)
    )
    this.router.put('/v1/payments/:id', (req, res) =>
      this.controller.updatePayment(req, res)
    )
    this.router.post('/v1/payments', (req, res) =>
      this.controller.createPayment(req, res)
    )
  }
}
