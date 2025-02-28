import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../common/interfaces/common.interface'
import { ProductService } from './product.service'

export class ProductsController {
  constructor(
    private readonly productService: ProductService = new ProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}

  async findAllProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.getProducts()
      if (data.length === 0) {
        this.httpResponse.NotFound(res, 'Products not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async getProductById(req: Request, res: Response) {
    try {
      const productId = req.params.id
      const data = await this.productService.getProductById(productId)
      if (!data) {
        this.httpResponse.NotFound(res, 'Product not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async createProduct(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.productService.createProduct(payload)
      this.httpResponse.Created(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async updateProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id
      const payload = req.body
      const data: UpdateResult = await this.productService.updateProduct(
        productId,
        payload
      )
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'Product not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async deleteProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id
      const data: DeleteResult =
        await this.productService.deleteProduct(productId)
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'Product not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
}
