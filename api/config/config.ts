import { DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

export abstract class ConfigServer {
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

  public get typeORMConfig(): DataSourceOptions {
    console.log('password :>> ', this.getEnvironment('DB_PASSWORD'))
    return {
      type: 'postgres',
      host: this.getEnvironment('DB_HOST'),
      port: this.getNumberEnv('DB_PORT'),
      username: this.getEnvironment('DB_USER'),
      password: this.getEnvironment('DB_PASSWORD'),
      database: this.getEnvironment('DB_NAME'),
      entities: [__dirname + '/../src/entities/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../src/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
