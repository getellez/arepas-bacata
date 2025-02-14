import 'reflect-metadata'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
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
    return [new UserRouter().router]
  }
}

export default MyApp
