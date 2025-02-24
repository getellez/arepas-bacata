import { BaseService } from '../common/services/base.service'
import { PaymentsDTO } from './payments.dto'
import { PaymentsEntity } from './payments.entity'

export class PaymentsService extends BaseService<PaymentsEntity> {
  constructor() {
    super(PaymentsEntity)
  }

  async findAllPayments() {
    return (await this.execRepository).find()
  }

  async findPaymentById(id: string) {
    return (await this.execRepository).findOne({ where: { id } })
  }

  async createPayment(payload: PaymentsDTO) {
    return (await this.execRepository).save(payload)
  }

  async deletePayment(id: string) {
    return (await this.execRepository).delete({ id })
  }

  async updatePayment(id: string, payload: PaymentsDTO) {
    return (await this.execRepository).update({ id }, payload)
  }
}
