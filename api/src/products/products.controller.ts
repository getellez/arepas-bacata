import { Request, Response } from 'express'
import { ProductService } from './product.service'

export class ProductsController {
  constructor(
    private readonly productService: ProductService = new ProductService()
  ) {}

  async findAllProducts(req: Request, res: Response) {
    try {
      const data = await this.productService.getProducts()
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async getProductById(req: Request, res: Response) {
    try {
      const productId = req.params.id
      const data = await this.productService.getProductById(productId)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async createProduct(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.productService.createProduct(payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async updateProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id
      const payload = req.body
      const data = this.productService.updateProduct(productId, payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async deleteProduct(req: Request, res: Response) {
    try {
      const productId = req.params.id
      const data = this.productService.deleteProduct(productId)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}
