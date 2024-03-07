import vine from '@vinejs/vine'
import { unique } from '#validators/helpers/db'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().unique(unique('users', 'email')),
    password: vine.string().minLength(8),
    username: vine.string().minLength(3).unique(unique('users', 'username')),
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
