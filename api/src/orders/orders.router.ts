import { BaseRouter } from '../common/router/base.router'
import { OrderItemsController, OrdersController } from './orders.controller'

export class OrdersRouter extends BaseRouter<OrdersController> {
  constructor() {
    super(OrdersController)
  }

  routes(): void {
    this.router.get('/v1/orders', (req, res) =>
      this.controller.findAllOrders(req, res)
    )
    this.router.post('/v1/orders', (req, res) =>
      this.controller.createOrder(req, res)
    )
    this.router.get('/v1/orders/:id', (req, res) =>
      this.controller.getOrderById(req, res)
    )
    this.router.put('/v1/orders/:id', (req, res) =>
      this.controller.updateOrder(req, res)
    )
    this.router.delete('/v1/orders/:id', (req, res) =>
      this.controller.deleteOrder(req, res)
    )
  }
}

export class OrderItemsRouter extends BaseRouter<OrderItemsController> {
  constructor() {
    super(OrderItemsController)
  }

  routes(): void {
    this.router.post('/v1/orders-items', (req, res) =>
      this.controller.createOrderItems(req, res)
    )
    this.router.get('/v1/orders-items/:orderId', (req, res) =>
      this.controller.getItemsByOrderId(req, res)
    )
    this.router.put(
      '/v1/orders-items/:orderId/products/:productId',
      (req, res) => this.controller.updateOrderItems(req, res)
    )
    this.router.delete(
      '/v1/orders-items/:orderId/products/:productId',
      (req, res) => this.controller.deleteItemFromOrder(req, res)
    )
  }
}
