import { conex } from '../../db/db.js'
import { GenerateToken } from './Token.controller.js'

export const Login = async (req, res) => {
  try {
    const { Email, Pass } = req.body
    const [[result]] = await conex.query('SELECT * FROM users WHERE Email=? AND Pass=? AND StatusUser = 1', [Email, Pass])
    console.log(result)

    if (!result) {
      return res.status(404).json({
        message: 'Verify the credentials'
      })
    }

    if (result.length < 0) {
      return res.status(404).json({
        message: 'the user does not exist'
      })
    }

    const Token = GenerateToken({
      id: result.IdUser,
      name: result.NameUser,
      email: result.Email,
      rol: result.RoleUser
    })

    res.cookie('token', Token, { maxAge: 900000, httpOnly: true }).json({
      id: result.IdUser,
      name: result.NameUser,
      email: result.Email,
      rol: result.RoleUser,
      token: Token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const NewUser = async (req, res) => {
  try {
    const { TypeDocument, Pass, NumDocument, Name, Birthday, Phone, Email, NumberHouse, Rol, State } = req.body
    const [result] = await conex.query('SELECT*FROM users WHERE Email = ?', [Email])
    console.log(result)
    if (result.length > 0) {
      return res.status(404).json({
        message: 'the user already exists'
      })
    }
    const [rows] = await conex.query('INSERT INTO users (TypeDoc, Pass, NumDoc, NameUser, BirthDate, Phone, Email, NumHouse, RoleUser, StatusUser) VALUES (?,?,?,?,?,?,?,?,?,?);', [TypeDocument, Pass, NumDocument, Name, Birthday, Phone, Email, NumberHouse, Rol, State])
    res.json({
      id: rows.id,
      Name,
      Email
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const LogOut = async (req, res) => {
  res.clearCookie('token', '', {
    expires: new Date(0)
  })
  return res.sendStatus(200)
}
