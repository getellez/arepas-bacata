import { BaseService } from '../common/services/base.service'
import { CategoriesEntity } from './categories.entity'

export class CategoriesService extends BaseService<CategoriesEntity> {
  constructor() {
    super(CategoriesEntity)
  }

  async findAllCategories() {
    return (await this.execRepository).find()
  }

  async findCategoryById(id: string) {
    return (await this.execRepository).findOne({ where: { id } })
  }

  async createCategory(payload: any) {
    return (await this.execRepository).save(payload)
  }

  async deleteCategory(id: string) {
    return (await this.execRepository).delete({ id })
  }

  async updateCategory(id: string, payload: any) {
    return (await this.execRepository).update({ id }, payload)
  }
}
