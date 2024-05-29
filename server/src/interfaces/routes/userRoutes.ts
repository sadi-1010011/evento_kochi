import { Router } from 'express'
import { createUser} from '../controllers/UserController'
import { getAllEvents } from '../controllers/AdminController'

const router = Router()

router.post('/register-user', createUser)

router.get('/get-all-events', getAllEvents)

router.get('/get-event/:id')

export default router