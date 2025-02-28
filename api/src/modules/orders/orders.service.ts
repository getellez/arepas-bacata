import { BaseService } from '../../common/services/base.service'
import { OrderDTO, OrderItemsDTO } from './orders.dto'
import { OrderItemsEntity, OrdersEntity } from './orders.entity'

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

export class OrderItemsService extends BaseService<OrderItemsEntity> {
  constructor() {
    super(OrderItemsEntity)
  }

  async createOrderItems(payload: OrderItemsDTO) {
    const { productQuantity, totalPrice, orderId, productId } = payload
    const orderItem = {
      orderId: { id: orderId },
      productId: { id: productId },
      productQuantity: productQuantity,
      totalPrice: totalPrice,
    }
    return (await this.execRepository).save(orderItem)
  }

  async getItemsByOrderId(orderId: string) {
    return (await this.execRepository).find({
      where: { orderId: { id: orderId } },
      loadRelationIds: true,
    })
  }

  async updateOrderItems(
    orderId: string,
    productId: string,
    payload: OrderItemsDTO
  ) {
    const { productQuantity, totalPrice } = payload
    const item = {
      orderId: { id: orderId },
      productId: { id: productId },
      productQuantity: productQuantity,
      totalPrice: totalPrice,
    }
    return (await this.execRepository).update(
      { orderId: { id: orderId }, productId: { id: productId } },
      item
    )
  }

  async deleteOrderItem(orderId: string, productId: string) {
    return (await this.execRepository).delete({
      orderId: { id: orderId },
      productId: { id: productId },
    })
  }
}
