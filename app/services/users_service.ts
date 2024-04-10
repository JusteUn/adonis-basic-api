import User from '#models/user'

export default class UsersService {
  async findOneByEmail(email: string) {
    return await User.query().where('email', email).first()
  }
}
