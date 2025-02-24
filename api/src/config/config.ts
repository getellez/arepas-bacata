import { DataSource, DataSourceOptions } from 'typeorm'
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

  protected async dbConnect(): Promise<DataSource> {
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

  public get typeORMConfig(): DataSourceOptions {
    const entities = [__dirname + '/../*/*.entity{.ts,.js}']
    return {
      type: 'postgres',
      host: this.getEnvironment('DB_HOST'),
      port: this.getNumberEnv('DB_PORT'),
      username: this.getEnvironment('DB_USER'),
      password: this.getEnvironment('DB_PASSWORD'),
      database: this.getEnvironment('DB_NAME'),
      entities: entities,
      migrations: [__dirname + '/../src/migrations/*{.ts,.js}'],
      synchronize: true,
      logging: false,
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
