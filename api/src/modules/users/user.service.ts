import { DeleteResult, UpdateResult } from 'typeorm'
import { BaseService } from '../../common/services/base.service'
import { UserDTO } from './user.dto'
import { UsersEntity } from './user.entity'

export class UserService extends BaseService<UsersEntity> {
  constructor() {
    super(UsersEntity)
  }

  async findAllUsers() {
    return (await this.execRepository).find()
  }
  async findUserById(id: string): Promise<UsersEntity | null> {
    return (await this.execRepository).findOne({ where: { id } })
  }
  async createUser(payload: UserDTO) {
    return (await this.execRepository).save(payload)
  }
  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id })
  }
  async updateUser(id: string, payload: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update({ id }, payload)
  }
}
