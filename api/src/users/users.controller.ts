import { Request, Response } from 'express'
import { UserDTO } from './user.dto'
import { UserService } from './user.service'

export class UserController {
  constructor(private readonly userService: UserService = new UserService()) {}
  async findAllUsers(req: Request, res: Response) {
    try {
      const data = await this.userService.findAllUsers()
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async findUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const data = await this.userService.findUserById(userId)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async createUser(req: Request, res: Response) {
    try {
      const payload = req.body
      const data = await this.userService.createUser(payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const payload = req.body as UserDTO
      const data = await this.userService.updateUser(userId, payload)
      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }
  async deleteUserById(req: Request, res: Response) {
    try {
      const userId = req.params.id
      const data = await this.userService.deleteUser(userId)
      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}
