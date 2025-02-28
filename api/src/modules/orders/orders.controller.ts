import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../common/interfaces/common.interface'
import { OrderItemsService, OrdersService } from './orders.service'

export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService = new OrdersService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async findAllOrders(req: Request, res: Response) {
    try {
      const data = await this.ordersService.getAllOrders()
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const orderId = req.params.id
      const data = await this.ordersService.getOrderById(orderId)

      if (!data) {
        this.httpResponse.NotFound(res, 'Order not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async createOrder(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.ordersService.createOrder(payload)
      this.httpResponse.Created(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id
      const payload = req.body
      const data: UpdateResult = await this.ordersService.updateOrder(
        orderId,
        payload
      )
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'Order not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id
      const data: DeleteResult = await this.ordersService.deleteOrder(orderId)
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'Order not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
}

export class OrderItemsController {
  constructor(
    private readonly orderItemsService: OrderItemsService = new OrderItemsService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async createOrderItems(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.orderItemsService.createOrderItems(payload)
      this.httpResponse.Created(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async getItemsByOrderId(req: Request, res: Response) {
    try {
      const orderId = req.params.orderId
      const data = await this.orderItemsService.getItemsByOrderId(orderId)
      if (!data.length) {
        this.httpResponse.NotFound(res, 'Order items not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async updateOrderItems(req: Request, res: Response) {
    try {
      const { orderId, productId } = req.params
      const payload = req.body
      const data: UpdateResult = await this.orderItemsService.updateOrderItems(
        orderId,
        productId,
        payload
      )
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'Order item not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }

  async deleteItemFromOrder(req: Request, res: Response) {
    try {
      const { orderId, productId } = req.params
      const data: DeleteResult = await this.orderItemsService.deleteOrderItem(
        orderId,
        productId
      )
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'Order item not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
}
