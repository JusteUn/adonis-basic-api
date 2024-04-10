/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { createUserValidator } from '#validators/user'

const AuthController = () => import('#controllers/auth_controller')
const TodosController = () => import('#controllers/todos_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Authenfications routes
router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])

router
  .group(() => {
    // Todos routes
    router.post('/todos', [TodosController, 'create'])
    router.get('/todos/:id', [TodosController, 'getById'])
    router.put('/todos/:id', [TodosController, 'update'])

    // Users routes
    router.get('/users/me', [UsersController, 'me'])
    router.put('/users/me', [UsersController, 'update'])
    router.get('/users/me/todos', [UsersController, 'todos'])
  })
  .use(
    middleware.auth({
      guards: ['api'],
    })
  )
