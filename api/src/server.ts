import http from 'node:http'
import MyApp from './app'
import express from 'express'
import { ConfigServer } from './config/config'
import { DataSource } from 'typeorm'

class ServerInitializer extends ConfigServer {
  private readonly app: express.Application
  private readonly server: http.Server
  public port: number = this.getNumberEnv('PORT') || 8000

  constructor() {
    super()
    this.app = new MyApp().app
    this.server = http.createServer(this.app)
  }

  private async dbConnect(): Promise<DataSource> {
    try {
      const PostgresDataSource = new DataSource(this.typeORMConfig)
      console.log('Connecting to database...')
      const db = await PostgresDataSource.initialize()
      console.log('Database connected')
      return db
    } catch (error) {
      console.error(`Error during data source initialization:`, error)
      process.exit(1)
    }
  }

  listen(port: number = this.port) {
    this.dbConnect()
    this.server
      .listen(port, () => {
        console.log(`Server running on port ${this.port}`)
      })
      .on('error', (err: any) => {
        console.error(`Error starting server: ${err.message}`)
      })
  }
}

const server = new ServerInitializer()
server.listen()
