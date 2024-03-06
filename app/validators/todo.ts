import vine from '@vinejs/vine'

export const createTodoValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3),
    description: vine.string().optional(),
  })
)

export const updateTodoValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).optional(),
    description: vine.string().optional(),
    completed: vine.boolean().optional(),
  })
)
