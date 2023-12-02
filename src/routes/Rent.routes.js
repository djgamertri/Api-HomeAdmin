import { Router } from 'express'
import { GetRentPending, GetRentAccepted } from '../controllers/Rent.controller.js'

const router = Router()

router.get('/GetRentPending', GetRentPending)

router.get('/GetRentAccepted', GetRentAccepted)

export default router
