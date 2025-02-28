import { BaseRouter } from '../../common/base.router'
import { ProductsController } from './product.controller'
import { ProductMiddleware } from './product.middleware'

export class ProductsRouter extends BaseRouter<
  ProductsController,
  ProductMiddleware
> {
  constructor() {
    super(ProductsController, ProductMiddleware)
  }

  routes(): void {
    this.router.get('/v1/products', (req, res) =>
      this.controller.findAllProducts(req, res)
    )
    this.router.post(
      '/v1/products',
      (req, res, next) => this.middleware.userValidator(req, res, next),
      (req, res) => this.controller.createProduct(req, res)
    )
    this.router.get('/v1/products/:id', (req, res) =>
      this.controller.getProductById(req, res)
    )
    this.router.put('/v1/products/:id', (req, res) =>
      this.controller.updateProduct(req, res)
    )
    this.router.post('/v1/products/:id', (req, res) =>
      this.controller.deleteProduct(req, res)
    )
  }
}
