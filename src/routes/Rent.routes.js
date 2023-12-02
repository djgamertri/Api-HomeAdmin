import { Router } from 'express'
import { GetRentPending, GetRentAccepted, NewRent } from '../controllers/Rent.controller.js'

const router = Router()

router.get('/GetRentPending', GetRentPending)

router.get('/GetRentAccepted', GetRentAccepted)

router.post('/NewRent', NewRent)

export default router
