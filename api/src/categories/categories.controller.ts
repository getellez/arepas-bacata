import { Request, Response } from 'express'
import { CategoriesService } from './categories.service'

export class CategoriesControllers {
  constructor(
    private readonly categoriesService: CategoriesService = new CategoriesService()
  ) {}
  async findAllCategories(req: Request, res: Response) {
    try {
      const data = await this.categoriesService.findAllCategories()
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async findCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = await this.categoriesService.findCategoryById(id)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async createCategory(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.categoriesService.createCategory(payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params
      const payload = req.body
      const data = await this.categoriesService.updateCategory(id, payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params
      const data = await this.categoriesService.deleteCategory(id)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}
