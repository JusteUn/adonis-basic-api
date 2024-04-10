import type { HttpContext } from '@adonisjs/core/http'
import Todo from '#models/todo'
import NotFoundException from '#exceptions/not_found_exception'
import { createTodoValidator, updateTodoValidator } from '#validators/todo'
import validator from '#decorators/validator'
import type { CreateTodoDto, UpdateTodoDto } from "../dto/todo_dto.js";
import TodoService from '#services/todo_service'
import { inject } from '@adonisjs/core'

@inject()
export default class TodosController {
  constructor(protected todoService: TodoService) {}
  @validator(createTodoValidator)
  async create({ auth }: HttpContext, data: CreateTodoDto) {
    const user = auth.getUserOrFail()
    return this.todoService.create(data, user)
  }

  async getById({ params, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const todo = await this.todoService.getById(params.id, user)
    if (!todo) {
      throw new NotFoundException(`Todo with id ${params.id} not found`)
    }
    return todo.toJSON()
  }

  @validator(updateTodoValidator)
  async update({ params, auth }: HttpContext, data: UpdateTodoDto) {
    const user = auth.getUserOrFail()
    const todo = await Todo.query().where('id', params.id).where('user_id', user.id).first()
    if (!todo) {
      throw new NotFoundException(`Todo with id ${params.id} not found`)
    }
    await todo.merge(data).save()
    return todo.toJSON()
  }
}
