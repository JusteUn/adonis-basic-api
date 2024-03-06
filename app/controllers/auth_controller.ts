import BadRequestException from '#exceptions/bad_request_exception'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    let user
    try {
      user = await User.verifyCredentials(email, password)
    } catch (error) {
      throw new BadRequestException('Invalid credentials')
    }
    const token = await User.accessTokens.create(user)

    return token
  }

  async register({ request }: HttpContext) {
    const userExists = await User.query().where('email', request.input('email')).first()
    if (userExists) {
      throw new BadRequestException('User already exists')
    }
    const user = new User()
    user.email = request.input('email')
    user.password = request.input('password')
    user.username = request.input('username')
    user.firstname = request.input('firstname')
    user.lastname = request.input('lastname')

    await user.save()

    const token = await User.accessTokens.create(user)

    return {
      user,
      token,
    }
  }
}
