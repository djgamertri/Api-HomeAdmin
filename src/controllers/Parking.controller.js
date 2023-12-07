import { conex } from '../../db/db.js'

export const NewParking = async (req, res) => {
  try {
    const data = req.body
    let Result = []
    data.forEach(async item => {
      const [result] = await conex.query('INSERT INTO Parking (IdSpace, Plate) VALUES (?, ?)', [item.parqueadero, item.placa])
      if (result.affectedRows === 0) {
        Result += `${item.usuario} Cant user register`
      }
    })
    console.log(Result)
    res.json(req.body)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const GetResidentsWithParking = async (req, res) => {
  try {
    const [result] = await conex.query('SELECT park.IdSpace, vehi.Plate, user.NameUser, user.NumHouse FROM users user INNER JOIN Vehicle vehi ON vehi.IdUser = user.IdUser INNER JOIN Parking park on vehi.Plate = park.Plate;')
    res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const GetResidentsWithOutParking = async (req, res) => {
  try {
    const [result] = await conex.query('SELECT u.NameUser, u.NumHouse, v.Plate FROM users u JOIN PayAdmin pa ON u.IdUser = pa.IdUser LEFT JOIN Vehicle v ON u.IdUser = v.IdUser LEFT JOIN Parking sp ON v.Plate = sp.Plate WHERE pa.StatusPayAdmin = 1 AND (v.Plate IS NULL OR sp.IdSpace IS NULL);')
    res.json(result)
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}
