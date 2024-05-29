import { Router } from 'express'
import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../controllers/AdminController'

const router = Router()

router.post('/create-event', createEvent)

router.get('/get-all-events', getAllEvents)

router.put('/update-event/:id', updateEvent)

router.delete('/delete-event', deleteEvent)

export default router