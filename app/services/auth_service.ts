import AuthRegisterDto from '../dto/auth_register_dto.js'
import User from '#models/user'
import BadRequestException from '#exceptions/bad_request_exception'
import UsersService from '#services/users_service'
import { inject } from '@adonisjs/core'

@inject()
export default class AuthService {
  constructor(protected usersService: UsersService) {}
  async register(data: AuthRegisterDto) {
    const userExists = await this.usersService.findOneByEmail(data.email)
    if (userExists) {
      throw new BadRequestException('User already exists')
    }
    const user = User.createFromDto(data)

    await user.save()

    const token = await User.accessTokens.create(user)

    return {
      user,
      token,
    }
  }

  async login(data: { email: string; password: string }) {
    const { email, password } = data
    let user
    try {
      user = await User.verifyCredentials(email, password)
    } catch (error) {
      throw new BadRequestException('Invalid credentials')
    }
    return await User.accessTokens.create(user)
  }
}
