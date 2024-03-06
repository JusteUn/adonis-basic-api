import type { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  async list({ request }: HttpContext) {
    return 'List all todos'
  }
}
