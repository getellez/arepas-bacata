import { EntityTarget, Repository } from 'typeorm'
import { ConfigServer } from '../../config/config'
import { BaseEntity } from '../entities/base.entity'

export abstract class BaseService<
  Entity extends BaseEntity,
> extends ConfigServer {
  public execRepository: Promise<Repository<Entity>>
  constructor(private readonly getEntity: EntityTarget<Entity>) {
    super()
    this.execRepository = this.initRepository(this.getEntity)
  }

  async initRepository(e: EntityTarget<Entity>): Promise<Repository<Entity>> {
    const getConnection = await this.dbConnect()
    return getConnection.getRepository(e)
  }
}
