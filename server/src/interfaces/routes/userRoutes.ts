import { Router } from 'express'
import { createUser} from '../controllers/UserController'

const router = Router()

router.post('/register-user', createUser)

export default router