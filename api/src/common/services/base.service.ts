import { EntityTarget, Repository } from 'typeorm'
import { ConfigServer } from '../../config/config'
import { BaseEntity } from '../entities/base.entity'

export abstract class BaseService<T extends BaseEntity> extends ConfigServer {
  public execRepository: Promise<Repository<T>>
  constructor(private readonly getEntity: EntityTarget<T>) {
    super()
    this.execRepository = this.initRepository(this.getEntity)
  }

  async initRepository(e: EntityTarget<T>): Promise<Repository<T>> {
    const getConnection = await this.dbConnect()
    return getConnection.getRepository(e)
  }
}
