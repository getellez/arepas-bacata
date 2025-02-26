import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import 'reflect-metadata'
import { CategoriesRouter } from './categories/categories.router'
import { OrdersRouter } from './orders/orders.router'
import { PaymentsRouter } from './payments/payments.router'
import { ProductsRouter } from './products/products.router'
import { UserRouter } from './users/users.router'

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
    this.app.use('/api', this.routers())
  }

  routers(): express.Router[] {
    return [
      new UserRouter().router,
      new ProductsRouter().router,
      new CategoriesRouter().router,
      new PaymentsRouter().router,
      new OrdersRouter().router,
    ]
  }
}

export default MyApp
