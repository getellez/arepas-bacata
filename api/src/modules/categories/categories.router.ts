import { BaseRouter } from '../../common/router/base.router'
import { CategoriesControllers } from './categories.controller'

export class CategoriesRouter extends BaseRouter<CategoriesControllers> {
  constructor() {
    super(CategoriesControllers)
  }

  routes(): void {
    this.router.get('/v1/categories', (req, res) =>
      this.controller.findAllCategories(req, res)
    )
    this.router.post('/v1/categories', (req, res) =>
      this.controller.createCategory(req, res)
    )
    this.router.get('/v1/categories/:id', (req, res) =>
      this.controller.findCategoryById(req, res)
    )
    this.router.put('/v1/categories/:id', (req, res) =>
      this.controller.updateCategory(req, res)
    )
    this.router.delete('/v1/categories/:id', (req, res) =>
      this.controller.deleteCategory(req, res)
    )
  }
}
