import { Router } from 'express'
import { NewUser, Login, LogOut } from '../controllers/Auth.controller.js'

const router = Router()

router.post('/Register', NewUser)

router.post('/Login', Login)

export default router
