import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { ConfigServer } from '../../config/config'
import { BaseEntity } from '../entities/base.entity'

export abstract class BaseService<T extends BaseEntity> extends ConfigServer {
  public execRepository: Promise<Repository<ObjectLiteral>>
  constructor(private readonly getEntity: EntityTarget<T>) {
    super()
    this.execRepository = this.initRepository(getEntity)
  }

  async initRepository(
    e: EntityTarget<ObjectLiteral>
  ): Promise<Repository<ObjectLiteral>> {
    const getConnection = await this.dbConnect()
    return getConnection.getRepository(e)
  }
}
