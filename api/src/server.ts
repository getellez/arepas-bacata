import express from 'express'
import http from 'node:http'
import 'reflect-metadata'
import { DataSource } from 'typeorm'
import MyApp from './app'
import { ConfigServer } from './common/config/config'

class ServerInitializer extends ConfigServer {
  private readonly app: express.Application
  private readonly server: http.Server
  public port: number = this.getNumberEnv('PORT') || 8000

  constructor() {
    super()
    this.app = new MyApp().app
    this.dbConnect()
    this.server = http.createServer(this.app)
  }

  async dbConnect(): Promise<DataSource | void> {
    try {
      return await ConfigServer.initConnect()
    } catch (error) {
      console.error(`Error connecting to database:`, error)
    }
  }

  listen(port: number = this.port) {
    this.server
      .listen(port, () => {
        console.log(`✅ Server running on port ${this.port}`)
      })
      .on('error', (err: any) => {
        console.error(`Error starting server: ${err.message}`)
      })
  }
}

const server = new ServerInitializer()
server.listen()
