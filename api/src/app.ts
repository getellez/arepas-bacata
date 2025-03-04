import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { AuthRouter } from './modules/auth/auth.router'
import { JwtStrategy, LoginStrategy } from './modules/auth/auth.strategies'
import { CategoriesRouter } from './modules/categories/categories.router'
import { OrderItemsRouter, OrdersRouter } from './modules/orders/orders.router'
import { PaymentsRouter } from './modules/payments/payments.router'
import { ProductsRouter } from './modules/products/product.router'
import { UserRouter } from './modules/users/user.router'
class MyApp {
  public app: express.Application
  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.use(helmet())
    this.app.use(cors())

    // Routes
    this.passportUse()
    this.app.use('/api', this.routers())
  }

  routers(): express.Router[] {
    return [
      new UserRouter().router,
      new ProductsRouter().router,
      new CategoriesRouter().router,
      new PaymentsRouter().router,
      new OrdersRouter().router,
      new OrderItemsRouter().router,
      new AuthRouter().router,
    ]
  }

  passportUse() {
    // Passport strategies
    return [new LoginStrategy().use, new JwtStrategy().use]
  }
}

export default MyApp
