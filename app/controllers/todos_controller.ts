import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import NotFoundException from '#exceptions/not_found_exception'

export default class TodosController {
  async create({ request, auth }: HttpContext) {
    const { title, description } = request.only(['title', 'description'])
    const user = auth.getUserOrFail()
    const todo = new Todo()
    todo.title = title
    todo.description = description
    await todo.related('user').associate(user)
    return todo.toJSON()
  }

  async getById({ params, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await Todo.query().where('id', params.id).where('user_id', user.id).first()
    if (!todo) {
      throw new NotFoundException(`Todo with id ${params.id} not found`)
    }
    return todo.toJSON()
  }

  async update({ request, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await Todo.query().where('id', params.id).where('user_id', user.id).first()
    if (!todo) {
      throw new NotFoundException(`Todo with id ${params.id} not found`)
    }
    const { title, description, completed } = request.only(['title', 'description', 'completed'])
    todo.title = title
    todo.description = description
    todo.completed = completed
    await todo.save()
    return todo.toJSON()
  }
}
