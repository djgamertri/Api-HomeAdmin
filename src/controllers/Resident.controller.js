import { conex } from '../../db/db.js'

export const GetResident = async (req, res) => {
  try {
    const Id = parseInt(req.params.id)
    const [result] = await conex.query('SELECT * FROM users WHERE IdUser = ? AND StatusUser = 1;', [Id])
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

export const GetResidents = async (req, res) => {
  try {
    const [result] = await conex.query('SELECT * FROM users WHERE StatusUser = 1;')
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

export const GetResidentsPayment = async (req, res) => {
  try {
    const [result] = await conex.query('SELECT user.NameUser, user.NumHouse, vehi.Plate FROM users user INNER JOIN PayAdmin pay ON pay.IdUser = user.IdUser INNER JOIN Vehicle vehi ON vehi.IdUser = user.IdUser WHERE pay.StatusPayAdmin = 1 AND user.StatusUser = 1;')
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

export const UpdateResident = async (req, res) => {
  try {
    const { TypeDoc, Pass, NumDoc, NameUser, BirthDate, Phone, Email, NumHouse, RoleUser, StatusUser, IdUser } = req.body
    const [result] = await conex.query('UPDATE users SET TypeDoc = IFNULL(?,TypeDoc), Pass = IFNULL(?,Pass), NumDoc = IFNULL(?,NumDoc), NameUser = IFNULL(?,NameUser), BirthDate = IFNULL(?,BirthDate), Phone = IFNULL(?,Phone), Email = IFNULL(?,Email), NumHouse = IFNULL(?,NumHouse), RoleUser = IFNULL(?,RoleUser), StatusUser = IFNULL(?,StatusUser) WHERE IdUser = ?;', [TypeDoc, Pass, NumDoc, NameUser, BirthDate, Phone, Email, NumHouse, RoleUser, StatusUser, IdUser])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found to update'
      })
    }
    const [rows] = await conex.query('Select * from users where IdUser = ?', [IdUser])
    console.log(result)
    res.json(rows[0])
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const DeleteResident = async (req, res) => {
  try {
    const Id = parseInt(req.params.id)
    const [result] = await conex.query('UPDATE users SET StatusUser = 0 WHERE IdUser = ?;', [Id])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found to update'
      })
    }
    const [rows] = await conex.query('Select * from users where IdUser = ?', [Id])
    console.log(result)
    res.json(rows[0])
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}
