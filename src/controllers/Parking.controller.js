import { conex } from "../../db/db.js";

export const NewParking = async (req,res) => {
    try {
        const data = req.body;
        const Result = []
        data.forEach(async item => {
            const [result] = await conex.query("INSERT INTO SpaceP (TypeSpace, Slot, IdVehicle) VALUES ('Parqueadero',?, ?)", [item.parqueadero,item.placa])
            if(result.affectedRows === 0) {
                Result += `${item.usuario} Cant user register`;
            }
        });
        console.log(Result);
        res.json(req.body);
    } catch (error) {
        return res.status(500).json({
            message: "something goes wrong",
            error
        })
    }
}

export const GetResidentsWithParking = async (req,res) => {
    try {
        const [result] = await conex.query("SELECT space.Slot, vehi.Plate, user.NameUser, user.NumHouse FROM users user INNER JOIN Vehicle vehi ON vehi.IdUser = user.IdUser INNER JOIN SpaceP space on vehi.Plate = space.IdVehicle;")
        // console.log(result);
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: "something goes wrong",
            error
        })
    }
}

export const GetResidentsWithOutParking = async (req,res) => {
    try {
        const [result] = await conex.query("SELECT u.NameUser, u.NumHouse, v.Plate FROM users u JOIN PayAdmin pa ON u.IdUser = pa.IdUser LEFT JOIN Vehicle v ON u.IdUser = v.IdUser LEFT JOIN SpaceP sp ON v.Plate = sp.IdVehicle WHERE pa.StatusPayAdmin = 1 AND (v.Plate IS NULL OR sp.IdSpace IS NULL);")
        // console.log(result);
        res.json(result);
    } catch (error) {
        return res.status(500).json({
            message: "something goes wrong",
            error
        })
    }
}

