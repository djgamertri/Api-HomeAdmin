import { Router } from 'express'
import { NewSlot, GetSlot, GetSlots, UpdateSlot, DeleteSlot } from '../controllers/Slot.controller.js'

const router = Router()

router.post('/Slot', NewSlot)

router.get('/Slot/:id', GetSlot)

router.get('/Slots', GetSlots)

router.patch('/Slot', UpdateSlot)

router.delete('/Slot/:id', DeleteSlot)

export default router
