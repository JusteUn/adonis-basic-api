import { inject } from '@adonisjs/core'
import { CreateTodoDto, UpdateTodoDto } from '../dto/todo_dto.js'
import User from '#models/user'
import Todo from '#models/todo'
import NotFoundException from '#exceptions/not_found_exception'

@inject()
export default class TodoService {
  async create(data: CreateTodoDto, user: User) {
    const todo = new Todo()
    todo.fill(data)
    await todo.related('user').associate(user)
    return todo.toJSON()
  }

  async getById(id: number, user: User) {
    return await Todo.query().where('id', id).where('user_id', user.id).first()
  }

  async update(id: number, data: UpdateTodoDto, user: User) {
    const todo = await this.getById(id, user)
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`)
    }
    todo.merge(data)
    await todo.save()
    return todo.toJSON()
  }
}
