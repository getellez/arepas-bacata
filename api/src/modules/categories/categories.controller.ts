import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../../interfaces/common.interface'
import { CategoriesService } from './categories.service'

export class CategoriesControllers {
  constructor(
    private readonly categoriesService: CategoriesService = new CategoriesService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async findAllCategories(req: Request, res: Response) {
    try {
      const data = await this.categoriesService.findAllCategories()
      if (data.length === 0) {
        this.httpResponse.NotFound(res, 'Categories not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async findCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = await this.categoriesService.findCategoryById(id)
      if (!data) {
        this.httpResponse.NotFound(res, 'Category not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async createCategory(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.categoriesService.createCategory(payload)
      this.httpResponse.Created(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params
      const payload = req.body
      const data: UpdateResult = await this.categoriesService.updateCategory(
        id,
        payload
      )
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'Category not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data: DeleteResult = await this.categoriesService.deleteCategory(id)
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'Category not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
}
