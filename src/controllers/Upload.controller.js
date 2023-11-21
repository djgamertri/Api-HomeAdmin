import multer from 'multer'
import sharp from 'sharp'

const storage = multer.memoryStorage()

export const upload = multer({ storage })

export const UploadImages = async (req, res) => {
  try {
    const { id, user } = req.body
    if (!req.file || !req.body.user) {
      return res.status(400).json({ error: 'No se proporcionó la imagen o el nombre de usuario.' })
    }

    const optimizedImageBuffer = await sharp(req.file.buffer)
      .resize({ width: 200, height: 200 })
      .toBuffer()

    const imagePath = `./images/${user}${id}${Date.now()}.png`

    await sharp(optimizedImageBuffer)
      .toFile(imagePath)

    res.status(200).json({ message: 'Imagen subida y optimizada exitosamente.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor.' })
  }
}
