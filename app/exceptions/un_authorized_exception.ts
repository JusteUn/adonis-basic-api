import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'

export default class UnAuthorizedException extends Exception {
  static status = 401
  static code = 'UNAUTHORIZED'

  async handle(error: this, ctx: HttpContext) {
    ctx.response.status(error.status).send({
      code: UnAuthorizedException.code,
      message: error.message,
    })
  }
}
