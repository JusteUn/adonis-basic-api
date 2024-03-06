import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
    username: vine.string().minLength(3),
    firstname: vine.string(),
    lastname: vine.string(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().optional(),
    username: vine.string().minLength(3).optional(),
    firstname: vine.string().optional(),
    lastname: vine.string().optional(),
  })
)
