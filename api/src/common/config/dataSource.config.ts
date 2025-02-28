import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config({
  path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env',
})

const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../../*/*.entity{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  migrations: [__dirname + '/../src/migrations/*{.ts,.js}'],
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
}

export const AppDataSourceConfig: DataSource = new DataSource(DataSourceConfig)
