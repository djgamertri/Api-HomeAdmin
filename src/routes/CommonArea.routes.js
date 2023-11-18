import { Router } from 'express'
import { NewCommonArea, GetCommonArea, GetCommonAreas, UpdateCommonArea, DeleteCommonArea } from '../controllers/CommonArea.js'

const router = Router()

router.post('/CommonArea', NewCommonArea)

router.get('/CommonArea', GetCommonArea)

router.get('/CommonAreas', GetCommonAreas)

router.patch('/CommonArea', UpdateCommonArea)

router.delete('/CommonArea/:id', DeleteCommonArea)

export default router
