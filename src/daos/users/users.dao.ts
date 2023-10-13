import mongooseService from 'common/services/mongoose.service';
import { CreateUserDto } from 'dto';

class UsersDao {
  Schema = mongooseService.getMongoose().Schema;

  userSchema = new this.Schema({
    email: String,
    firstName: String
  });

  User = mongooseService.getMongoose().model('User', this.userSchema);

  constructor() {
    console.log('Created new instance of UsersDao');
  }

  async addUser(input: CreateUserDto) {
    const user = this.User.create({
      email: input.email,
      firstName: input.firstName
    });
    return user;
  }

  async getUsers(limit = 25, page = 0) {
    const users = this.User.find()
      .limit(limit)
      .skip(limit * page);
    return users;
  }
}

export default new UsersDao();
