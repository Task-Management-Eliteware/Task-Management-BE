import { CRUD } from 'common';
import UsersDao from 'daos/users/users.dao';
import { CreateUserDto } from 'dto';

class UserServices implements CRUD {
  async create(resource: CreateUserDto) {
    return UsersDao.addUser(resource);
  }

  async list(limit: number, page: number) {
    return UsersDao.getUsers();
  }
}

export default new UserServices();
