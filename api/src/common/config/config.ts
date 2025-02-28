import { DataSource } from 'typeorm'
import { AppDataSourceConfig } from './dataSource.config'

export abstract class ConfigServer {
  private static dataSourceConnection: Promise<DataSource> | null = null
  constructor() {
    require('dotenv').config({ path: this.getEnvFile(this.nodeEnv) })
  }
  public getEnvironment(k: string): string | undefined {
    return process.env[k]
  }

  public getNumberEnv(k: string) {
    return Number(process.env[k])
  }

  get nodeEnv(): string {
    // nodeEnv = 'local', 'development', 'production' or 'test'
    return this.getEnvironment('NODE_ENV')?.trim() ?? ''
  }

  public getEnvFile(nodeEnv: string): string {
    // nodeEnv = 'local', 'development', 'production' or 'test'
    if (!nodeEnv.length) {
      return '.env'
    }

    return `.env.${nodeEnv}`
  }

  static async initConnect(): Promise<DataSource> {
    if (!ConfigServer.dataSourceConnection) {
      console.log('Datasource connected')
      ConfigServer.dataSourceConnection = AppDataSourceConfig.initialize()
    }

    return ConfigServer.dataSourceConnection
  }
}
