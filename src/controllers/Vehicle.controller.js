import { conex } from '../../db/db.js'

export const NewVehicle = async (req, res) => {
  try {
    const { Plate, TypeVehicle, IdUser } = req.body
    const [result] = await conex.query('INSERT INTO Vehicle (Plate, TypeVehicle, IdUser) VALUES (?,?,?),', [Plate, TypeVehicle, IdUser])
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

export const GetVehicles = async (req, res) => {
  try {
    const [result] = await conex.query('SELECT * FROM Vehicle WHERE StatusVehicle = 1;')
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

export const GetVehicle = async (req, res) => {
  try {
    const Id = parseInt(req.params.id)
    const [result] = await conex.query('SELECT * FROM Vehicle WHERE Plate = ?;', [Id])
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

export const UpdateVehicle = async (req, res) => {
  try {
    const { Plate, StatusVehicle, TypeVehicle, IdUser } = req.body
    const [result] = await conex.query('UPDATE Vehicle SET Plate = IFNULL(?,Plate),  StatusVehicle = IFNULL(?,StatusVehicle), TypeVehicle = IFNULL(?,TypeVehicle) WHERE IdUser = ?;', [Plate, StatusVehicle, TypeVehicle, IdUser])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Common Area not found to update'
      })
    }
    const [rows] = await conex.query('SELECT * FROM Vehicle where Plate = ?', [Plate])
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

export const DeleteVehicle = async (req, res) => {
  try {
    const Plate = parseInt(req.params.id)
    const [result] = await conex.query('UPDATE Vehicle SET StatusVehicle = 0 WHERE Plate = ?;', [Plate])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found to update'
      })
    }
    const [rows] = await conex.query('SELECT * FROM Vehicle where Plate = ?', [Plate])
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
