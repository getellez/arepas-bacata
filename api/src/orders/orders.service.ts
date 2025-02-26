import { BaseService } from '../common/services/base.service'
import { OrderDTO } from './orders.dto'
import { OrdersEntity } from './orders.entity'

export class OrdersService extends BaseService<OrdersEntity> {
  constructor() {
    super(OrdersEntity)
  }

  async getAllOrders(): Promise<OrdersEntity[]> {
    return (await this.execRepository).find()
  }

  async getOrderById(id: string): Promise<OrdersEntity | null> {
    return (await this.execRepository).findOne({ where: { id } })
  }

  async createOrder(payload: OrderDTO) {
    return (await this.execRepository).save(payload)
  }

  async updateOrder(id: string, payload: OrderDTO) {
    return (await this.execRepository).update({ id }, payload)
  }

  async deleteOrder(id: string) {
    return (await this.execRepository).delete(id)
  }
}
