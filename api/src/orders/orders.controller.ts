import { Request, Response } from 'express'
import { OrderItemsService, OrdersService } from './orders.service'

export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService = new OrdersService()
  ) {}

  async findAllOrders(req: Request, res: Response) {
    try {
      const data = await this.ordersService.getAllOrders()
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const orderId = req.params.id
      const data = await this.ordersService.getOrderById(orderId)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.ordersService.createOrder(payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id
      const payload = req.body
      const data = await this.ordersService.updateOrder(orderId, payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id
      const data = await this.ordersService.deleteOrder(orderId)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}

export class OrderItemsController {
  constructor(
    private readonly orderItemsService: OrderItemsService = new OrderItemsService()
  ) {}

  async createOrderItems(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.orderItemsService.createOrderItems(payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getItemsByOrderId(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId
      const data = await this.orderItemsService.getItemsByOrderId(orderId)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async updateOrderItems(req: Request, res: Response) {
    try {
      const { orderId, productId } = req.params
      const payload = req.body
      const data = await this.orderItemsService.updateOrderItems(
        orderId,
        productId,
        payload
      )
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteItemFromOrder(req: Request, res: Response) {
    try {
      const { orderId, productId } = req.params
      const data = await this.orderItemsService.deleteOrderItem(
        orderId,
        productId
      )
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}
