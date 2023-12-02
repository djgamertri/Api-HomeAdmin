import { Router } from 'express'
import { GetRentPending, GetRentAccepted, getRent, NewRent, UpdateRent, DeleteRent } from '../controllers/Rent.controller.js'

const router = Router()

router.get('/GetRentPending', GetRentPending)

router.get('/GetRentAccepted', GetRentAccepted)

router.get('/GetRent/:id', getRent)

router.post('/NewRent', NewRent)

router.patch('/UpdateRent', UpdateRent)

router.delete('/DeleteRent/:id', DeleteRent)

export default router
