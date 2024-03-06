/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
const TodosController = () => import('#controllers/todos_controller')
const UsersController = () => import('#controllers/users_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Authenfications routes
router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])

// Todos routes
router.post('/todos', [TodosController, 'create']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.get('/todos/:id', [TodosController, 'getById']).use(
  middleware.auth({
    guards: ['api'],
  })
)
router.put('/todos/:id', [TodosController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)

// Users routes
router.get('/users/me', [UsersController, 'me']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.put('/users/me', [UsersController, 'update']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('/users/me/todos', [UsersController, 'todos']).use(
  middleware.auth({
    guards: ['api'],
  })
)
