import { updateUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async me({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return user.toJSON()
  }

  async update({ request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const data = request.only(['username', 'firstname', 'lastname', 'email'])
    const payload = await updateUserValidator.validate(data)
    await user.merge(payload).save()
    return user.toJSON()
  }

  async todos({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const todos = await user.related('todos').query()
    return todos.map((todo) => todo.toJSON())
  }
}
