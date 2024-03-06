import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async me({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    return user.toJSON()
  }

  async update({ request, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { username, firstname, lastname, email } = request.only([
      'username',
      'firstname',
      'lastname',
      'email',
    ])
    user.username = username
    user.firstname = firstname
    user.lastname = lastname
    user.email = email
    await user.save()
    return user.toJSON()
  }

  async todos({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const todos = await user.related('todos').query()
    return todos.map((todo) => todo.toJSON())
  }
}
