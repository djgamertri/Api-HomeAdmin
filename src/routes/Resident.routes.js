import { Router } from 'express'
import { DeleteResident, GetResident, GetResidents, GetResidentsPayment, UpdateResident } from '../controllers/Resident.controller.js'

const router = Router()

router.get('/Resident/:id', GetResident)

router.get('/ResidentPayment', GetResidentsPayment)

router.get('/Residents', GetResidents)

router.patch('/Resident', UpdateResident)

router.delete('/Resident/:id', DeleteResident)

export default router
