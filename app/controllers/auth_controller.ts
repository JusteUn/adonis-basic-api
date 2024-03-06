import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return token
  }

  async register({ request }: HttpContext) {
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
