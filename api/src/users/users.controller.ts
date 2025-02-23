import { Request, Response } from 'express'

export class UserController {
  getUsers(req: Request, res: Response) {
    res.status(200).json({ user: 'Germán Téllez' })
  }
  addUser(req: Request, res: Response) {
    res.status(201).json({ user: 'Germán Téllez' })
  }
}
