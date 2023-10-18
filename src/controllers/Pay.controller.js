import { conex } from '../../db/db.js'

export const NewPay = async (req, res) => {
  try {
    const { User, Date, State, File } = req.body
    const [result] = await conex.query('INSERT INTO PayAdmin (IdUser, RegistDate, StatusPayAdmin, FIlePayAdmin) VALUES (?, ?, ?, ?);', [User, Date, State, File])
    console.log(result)
    res.json({
      TaxValue,
      TaxYear
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const GetPay = async (req, res) => {
  try {
    const Id = parseInt(req.query.id)
    const [result] = await conex.query('SELECT * FROM PayAdmin WHERE IdPayAdmin = ?;', [Id])
    console.log(result)
    res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const GetPays = async (req, res) => {
  try {
    const [result] = await conex.query('SELECT * FROM PayAdmin inner join users on PayAdmin.IdUser = users.IdUser;')
    console.log(result)
    res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const UpdatePay = async (req, res) => {
  try {
    const { User, Date, State, File, Id } = req.body
    const [result] = await conex.query('UPDATE PayAdmin SET IdUser = IFNULL(?,IdUser), RegistDate = IFNULL(?,RegistDate), StatusPayAdmin = IFNULL(?,StatusPayAdmin), FIlePayAdmin = IFNULL(?,FIlePayAdmin) WHERE IdPayAdmin = ?;', [User, Date, State, File, Id])
    console.log(result)
    res.json({
      TaxValue,
      TaxYear
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}
