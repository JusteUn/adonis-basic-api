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
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Authenfications routes
router.post('/login', [AuthController, 'login'])
router.post('/register', [AuthController, 'register'])

// Todos routes
router.get('/todos', [TodosController, 'list']).use(
  middleware.auth({
    guards: ['api'],
  })
)
