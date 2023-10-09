// we import express to add types to the request/response objects from our controller functions
import { Request, Response } from 'express';
import usersService from 'users/services/users.service';

class UsersController {
  async listUsers(req: Request, res: Response) {
    const users = await usersService.list(100, 0);
    res.status(200).json({ data: users });
  }

  async createUser(req: Request, res: Response) {
    const userId = await usersService.create(req.body);
    res.status(201).send({ id: userId });
  }
}

export default new UsersController();
