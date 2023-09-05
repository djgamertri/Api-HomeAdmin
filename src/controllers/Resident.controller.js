import { conex } from "../../db/db.js";

export const GetResident = async (req,res) => {
    try {
        const Id = parseInt(req.query.id);
        const [result] = await conex.query("SELECT * FROM users WHERE IdUser = ?;",[Id])
        console.log(result);
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: "something goes wrong"
        })
    }
}

export const GetResidents = async (req,res) => {
    try {
        const [result] = await conex.query("SELECT * FROM users;")
        console.log(result);
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: "something goes wrong"
        })
    }
}

export const GetResidentsPayment = async (req,res) => {
    try {
        const [result] = await conex.query("SELECT user.NameUser, user.NumHouse, vehi.Plate FROM users user INNER JOIN PayAdmin pay ON pay.IdUser = user.IdUser INNER JOIN Vehicle vehi ON vehi.IdUser = user.IdUser WHERE pay.StatusPayAdmin = 1;")
        console.log(result);
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: "something goes wrong"
        })
    }
}

export const UpdateResident = async (req,res) => {
    try {
        const {TypeDocument,Pass,NumDocument,Name,Birthday,Phone,Email,NumberHouse,Rol,State,Id} = req.body
        const [result] = await conex.query("UPDATE users SET TypeDoc = IFNULL(?,TypeDoc), Pass = IFNULL(?,Pass), NumDoc = IFNULL(?,NumDoc), NameUser = IFNULL(?,NameUser), BirthDate = IFNULL(?,BirthDate), Phone = IFNULL(?,Phone), Email = IFNULL(?,Email), NumHouse = IFNULL(?,NumHouse), RoleUser = IFNULL(?,RoleUser), StatusUser = IFNULL(?,StatusUser) WHERE IdUser = ?;",[TypeDocument,Pass,NumDocument,Name,Birthday,Phone,Email,NumberHouse,Rol,State,Id])
        if(result.affectedRows === 0) return res.status(404).json({
            message: "User not found to update"
        })
        const [rows] = await conex.query("Select * from users where IdUser = ?",[Id])
        console.log(result);
        res.json(rows[0]); 
    } catch (error) {
        return res.status(500).json({
            message: "something goes wrong"
        })
    }
}