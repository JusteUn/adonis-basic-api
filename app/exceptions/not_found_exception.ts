import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotFoundException extends Exception {
  static status = 404
  static code = 'NOT_FOUND'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      code: NotFoundException.code,
      message: error.message,
    })
  }
}
