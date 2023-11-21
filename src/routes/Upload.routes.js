import { Router } from 'express'
import { UploadImages, upload } from '../controllers/Upload.controller.js'

const router = Router()

router.post('/ImagesUploadtest', upload.single('image'), UploadImages)

export default router
