import { conex } from '../../db/db.js'

export const NewSlot = async (req, res) => {
    try {
      const { TypeSpace } = req.body
      const [result] = await conex.query('INSERT INTO Slot (TypeSlot) VALUES (?)', [TypeSpace])
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

export const GetSlots = async (req, res) => {
  try {
    const [result] = await conex.query('SELECT * FROM Slot WHERE StatusSlot = 1;')
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

export const GetSlot = async (req, res) => {
  try {
    const Id = parseInt(req.query.id)
    const [result] = await conex.query('SELECT * FROM Slot WHERE IdSlot = ?;', [Id])
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

export const UpdateSlot = async (req, res) => {
  try {
    const { CommonArea, Status, Id } = req.body
    const [result] = await conex.query('UPDATE Slot SET TypeSlot = IFNULL(?,TypeSlot),  StatusSlot = IFNULL(?,StatusSlot) WHERE IdSlot = ?;', [CommonArea, Status, Id])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Common Area not found to update'
      })
    }
    const [rows] = await conex.query('SELECT * FROM Slot where IdSlot = ?', [Id])
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

export const DeleteSlot = async (req, res) => {
  try {
    const Id = parseInt(req.params.id)
    const [result] = await conex.query('UPDATE Slot SET status = 0 WHERE IdSlot = ?;', [Id])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found to update'
      })
    }
    const [rows] = await conex.query('SELECT * FROM Slot where IdSlot = ?', [Id])
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
