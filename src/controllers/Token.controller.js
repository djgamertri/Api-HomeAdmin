import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
import { TOKEN_KEY } from '../../db/config.js'

config()

export const GenerateToken = (user) => {
  return jwt.sign(user, TOKEN_KEY, { expiresIn: '60m' })
}

export const ValidateToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).send('Access denied')
  }
  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) {
      return res.status(401).send('Access denied, token expired or invalid')
    }
    req.UserInfo = user
    next()
  })
}
