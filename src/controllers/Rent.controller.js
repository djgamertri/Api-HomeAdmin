import { conex } from '../../db/db.js'

export const GetRentPending = async (req, res) => {
  try {
    const [result] = await conex.query('select u.NameUser, c.NameCommonArea, r.RentDate from users as u JOIN rent as r on u.IdUser = r.IdUser JOIN commonarea as c on c.IdCommonArea = r.IdCommonArea JOIN PayAdmin pa ON u.IdUser = pa.IdUser WHERE pa.StatusPayAdmin = 1 AND r.status = 0;')
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
    const [result] = await conex.query('select u.NameUser, c.NameCommonArea, r.RentDate from users as u JOIN rent as r on u.IdUser = r.IdUser JOIN commonarea as c on c.IdCommonArea = r.IdCommonArea JOIN PayAdmin pa ON u.IdUser = pa.IdUser WHERE pa.StatusPayAdmin = 1 AND r.status = 1;')
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
