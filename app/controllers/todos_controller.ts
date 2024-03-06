import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import NotFoundException from '#exceptions/not_found_exception'
import { createTodoValidator, updateTodoValidator } from '#validators/todo'

export default class TodosController {
  async create({ request, auth }: HttpContext) {
    const data = request.only(['title', 'description'])
    const payload = await createTodoValidator.validate(data)
    const user = auth.getUserOrFail()
    const todo = new Todo()
    todo.fill(payload)
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
    const data = request.only(['title', 'description', 'completed'])
    const payload = await updateTodoValidator.validate(data)
    await todo.merge(payload).save()
    return todo.toJSON()
  }
}
