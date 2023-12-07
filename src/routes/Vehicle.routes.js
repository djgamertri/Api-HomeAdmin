import { Router } from 'express'
import { DeleteVehicle, GetVehicle, GetVehicles, NewVehicle, UpdateVehicle } from '../controllers/Vehicle.controller.js'

const router = Router()

router.post('/Vehicle', NewVehicle)

router.get('/Vehicle/:id', GetVehicle)

router.get('/Vehicle', GetVehicles)

router.patch('/Vehicle', UpdateVehicle)

router.delete('/Vehicle/:id', DeleteVehicle)

export default router
