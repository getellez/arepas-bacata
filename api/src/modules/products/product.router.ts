import { BaseRouter } from '../../common/router/base.router'
import { ProductsController } from './product.controller'

export class ProductsRouter extends BaseRouter<ProductsController> {
  constructor() {
    super(ProductsController)
  }

  routes(): void {
    this.router.get('/v1/products', (req, res) =>
      this.controller.findAllProducts(req, res)
    )
    this.router.post('/v1/products', (req, res) =>
      this.controller.createProduct(req, res)
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
