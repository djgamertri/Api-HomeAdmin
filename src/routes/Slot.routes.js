import { Router } from 'express'
import { NewSlot, GetSlot, GetSlots, UpdateSlot, DeleteSlot } from '../controllers/Slot.js'

const router = Router()

router.post('/Slot', NewSlot)

router.get('/Slot', GetSlot)

router.get('/Slots', GetSlots)

router.patch('/Slot', UpdateSlot)

router.delete('/Slot/:id', DeleteSlot)

export default router
