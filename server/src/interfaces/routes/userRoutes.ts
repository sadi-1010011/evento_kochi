import { Router } from 'express'
import { getAllEvents } from '../controllers/AdminController'
import { getEvent } from '../controllers/EventController'
import { checkUser } from '../../application/middleware/AuthMiddlewares'
import { userLogin, userSignup } from '../controllers/AuthController'

const router = Router()

router.get('/',checkUser)

router.post('/signup', userSignup)

router.post('/login', userLogin)

router.get('/get-all-events', getAllEvents)

router.get('/get-event/:id', getEvent)

export default router