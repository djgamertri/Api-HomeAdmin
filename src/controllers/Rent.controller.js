import { conex } from '../../db/db.js'

export const GetRentPending = async (req, res) => {
  try {
    const [result] = await conex.query('select r.IdRent, u.NameUser, c.NameCommonArea, r.RentDate, r.active from users as u JOIN rent as r on u.IdUser = r.IdUser JOIN commonarea as c on c.IdCommonArea = r.IdCommonArea JOIN PayAdmin pa ON u.IdUser = pa.IdUser WHERE pa.StatusPayAdmin = 1 AND r.status = 0;')
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

export const GetRentAccepted = async (req, res) => {
  try {
    const [result] = await conex.query('select r.IdRent, u.NameUser, c.NameCommonArea, r.RentDate, r.active from users as u JOIN rent as r on u.IdUser = r.IdUser JOIN commonarea as c on c.IdCommonArea = r.IdCommonArea JOIN PayAdmin pa ON u.IdUser = pa.IdUser WHERE pa.StatusPayAdmin = 1 AND r.status = 1;')
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

export const getRent = async (req, res) => {
  try {
    const Id = parseInt(req.params.id)
    const [result] = await conex.query('SELECT * FROM rent WHERE Idrent = ?', [Id])
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

export const NewRent = async (req, res) => {
  try {
    const { IdUser, IdCommonArea, RentDate } = req.body
    const [result] = await conex.query('INSERT INTO rent (IdUser, IdCommonArea, RentDate) VALUES (?,?,?)', [IdUser, IdCommonArea, RentDate])
    console.log(result)
    res.json({
      result
    })
  } catch (error) {
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const UpdateRent = async (req, res) => {
  try {
    const { IdUser, IdCommonArea, RentDate, status, active, IdRent } = req.body
    const [result] = await conex.query('UPDATE rent SET IdUser = IFNULL (?,IdUser), IdCommonArea = IFNULL (?,IdCommonArea), RentDate = IFNULL(?, RentDate), status = IFNULL(?, status), active = IFNULL (?, active) WHERE IdRent = ?', [IdUser, IdCommonArea, RentDate, status, active, IdRent])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found to update'
      })
    }
    const [rows] = await conex.query('SELECT * from rent WHERE IdRent = ?', [IdRent])
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

export const DeleteRent = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const [result] = await conex.query('UPDATE rent SET active = 0 WHERE IdRent = ?', [id])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Rent not found to update'
      })
    }
    const [rows] = await conex.query('SELECT * FROM rent WHERE IdRent = ?', [id])
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
