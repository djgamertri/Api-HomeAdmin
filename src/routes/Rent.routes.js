import { Router } from 'express'
import { GetRentPending, GetRentAccepted, NewRent, UpdateRent, DeleteRent } from '../controllers/Rent.controller.js'

const router = Router()

router.get('/GetRentPending', GetRentPending)

router.get('/GetRentAccepted', GetRentAccepted)

router.post('/NewRent', NewRent)

router.patch('/UpdateRent', UpdateRent)

router.delete('/DeleteRent/:id', DeleteRent)

export default router
