import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../common/services/base.service'
import { ProductDTO } from './product.dto'
import { ProductsEntity } from './product.entity'

export class ProductService extends BaseService<ProductsEntity> {
  constructor() {
    super(ProductsEntity)
  }
  async getProducts(): Promise<ProductsEntity[]> {
    return (await this.execRepository).find()
  }
  async getProductById(id: string): Promise<ProductsEntity | null> {
    return (await this.execRepository).findOne({ where: { id } })
  }
  async createProduct(payload: ProductDTO) {
    return (await this.execRepository).save(payload)
  }
  async updateProduct(id: string, product: ProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update({ id }, product)
  }
  async deleteProduct(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete(id)
  }
}
