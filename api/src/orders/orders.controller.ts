import { Request, Response } from 'express'
import { OrdersService } from './orders.service'

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
