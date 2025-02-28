import { BaseRouter } from '../../common/base.router'
import { CategoriesControllers } from './categories.controller'
import { CategoriesMiddleware } from './categories.middleware'

export class CategoriesRouter extends BaseRouter<
  CategoriesControllers,
  CategoriesMiddleware
> {
  constructor() {
    super(CategoriesControllers, CategoriesMiddleware)
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
