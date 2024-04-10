import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Todo from '#models/todo'
import AuthRegisterDto from "../dto/auth_register_dto.js";

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string | null

  @column()
  declare firstname: string | null

  @column()
  declare lastname: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Todo)
  declare todos: HasMany<typeof Todo>
  static createFromDto = (dto: AuthRegisterDto) => {
    const user = new User()
    user.email = dto.email
    user.password = dto.password
    user.username = dto.username
    user.firstname = dto.firstname
    user.lastname = dto.lastname
    return user
  }

  static accessTokens = DbAccessTokensProvider.forModel(User)
}
