import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import AuthService from '#services/auth_service'
import validator from '#decorators/validator'
import type AuthRegisterDto from '../dto/auth_register_dto.js'

export default class AuthController {
  constructor(protected authService: AuthService) {}
  async login({ request }: HttpContext) {
    const data = request.only(['email', 'password'])

    return await this.authService.login(data)
  }

  @validator(createUserValidator)
  async register({}: HttpContext, body: AuthRegisterDto) {
    return await this.authService.register(body)
  }
}
