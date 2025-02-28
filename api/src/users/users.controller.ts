import { Request, Response } from 'express'
import { DeleteResult, UpdateResult } from 'typeorm'
import { HttpResponse } from '../common/interfaces/common.interface'
import { UserDTO } from './user.dto'
import { UserService } from './user.service'

export class UserController {
  constructor(
    private readonly userService: UserService = new UserService(),
    private readonly httpResponse: HttpResponse = new HttpResponse()
  ) {}
  async findAllUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUsers()
      if (!data) {
        this.httpResponse.NotFound(res, 'Users not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async findUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const data = await this.userService.findUserById(userId)
      if (!data) {
        this.httpResponse.NotFound(res, 'User not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.userService.createUser(payload)
      this.httpResponse.Created(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const payload = req.body as UserDTO
      const data: UpdateResult = await this.userService.updateUser(
        userId,
        payload
      )
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'User not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
  async deleteUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const data: DeleteResult = await this.userService.deleteUser(userId)
      if (data.affected === 0) {
        this.httpResponse.NotFound(res, 'User not found')
        return
      }
      this.httpResponse.Ok(res, data)
    } catch (error) {
      this.httpResponse.Error(res, error)
    }
  }
}
