import bcrypt from 'bcrypt'
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

  async findUserByEmail(email: string): Promise<UsersEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne()
  }
  async findUserByUsername(username: string): Promise<UsersEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
      .getOne()
  }

  async createUser(payload: UserDTO) {
    const newUser = (await this.execRepository).create(payload)
    const hash = await bcrypt.hash(newUser.password, 10)
    newUser.password = hash
    return (await this.execRepository).save(newUser)
  }
  async deleteUser(id: string): Promise<DeleteResult> {
    return (await this.execRepository).delete({ id })
  }
  async updateUser(id: string, payload: UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update({ id }, payload)
  }
}
