import BadRequestException from '#exceptions/bad_request_exception'
import User from '#models/user'
import { createUserValidator } from '#validators/user'
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
    const data = request.only(['email', 'password', 'username', 'firstname', 'lastname'])
    const payload = await createUserValidator.validate(data)
    const userExists = await User.query().where('email', payload['email']).first()
    if (userExists) {
      throw new BadRequestException('User already exists')
    }
    const user = new User()
    user.email = payload['email']
    user.password = payload['password']
    user.username = payload['username']
    user.firstname = payload['firstname']
    user.lastname = payload['lastname']

    await user.save()

    const token = await User.accessTokens.create(user)

    return {
      user,
      token,
    }
  }
}
