import { conex } from '../../db/db.js'

export const NewCommonArea = async (req, res) => {
  try {
    const { CommonArea } = req.body
    const [result] = await conex.query('INSERT INTO CommonArea (NameCommonArea) VALUES (?)', [CommonArea])
    console.log(result)
    res.json({
      id: result.id,
      CommonArea
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'something goes wrong',
      error
    })
  }
}

export const GetCommonAreas = async (req, res) => {
  try {
    const [result] = await conex.query('SELECT * FROM CommonArea WHERE status = 1;')
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

export const GetCommonArea = async (req, res) => {
  try {
    const Id = parseInt(req.params.id)
    const [result] = await conex.query('SELECT * FROM CommonArea WHERE IdCommonArea = ?;', [Id])
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

export const UpdateCommonArea = async (req, res) => {
  try {
    const { CommonArea, Status, Id } = req.body
    const [result] = await conex.query('UPDATE CommonArea SET NameCommonArea = IFNULL(?,NameCommonArea), status = IFNULL(?,status) WHERE IdCommonArea = ?;', [CommonArea, Status, Id])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Common Area not found to update'
      })
    }
    const [rows] = await conex.query('SELECT * FROM CommonArea where IdCommonArea = ?', [Id])
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

export const DeleteCommonArea = async (req, res) => {
  try {
    const Id = parseInt(req.params.id)
    const [result] = await conex.query('UPDATE CommonArea SET status = 0 WHERE IdCommonArea = ?;', [Id])
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'User not found to update'
      })
    }
    const [rows] = await conex.query('SELECT * FROM CommonArea where IdCommonArea = ?', [Id])
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
