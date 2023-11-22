import express from 'express'
import AuthRoutes from './routes/Auth.routes.js'
import UploadRoutes from './routes/Upload.routes.js'
import PayRoutes from './routes/Pay.routes.js'
import CommonAreaRoutes from './routes/CommonArea.routes.js'
import SlotRoutes from './routes/Slot.routes.js'
import ParkingRoutes from './routes/Parking.routes.js'
import ResidentRoutes from './routes/Resident.routes.js'
import { ValidateToken } from './controllers/Token.controller.js'
import { PORT } from '../db/config.js'
import cors from 'cors'
import logger from 'morgan'

const app = express()

const corsOptions = {
  origin: 'http://localhost:5173',
  optionSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api', AuthRoutes)
app.use('/api', UploadRoutes)
app.use('/api', ResidentRoutes)
app.use('/api', PayRoutes)
app.use('/api', ValidateToken, CommonAreaRoutes)
app.use('/api', ValidateToken, SlotRoutes)
app.use('/api', ValidateToken, ParkingRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'This page not found'
  })
})

app.listen(PORT)
