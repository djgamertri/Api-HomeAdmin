import { Router } from "express";
import { NewParking, GetResidentsWithOutParking, GetResidentsWithParking } from "../controllers/Parking.controller.js";

const router = Router()

router.get("/ResidentWithParking", GetResidentsWithParking);

router.get("/ResidentWithOutParking", GetResidentsWithOutParking);

router.post("/Parking", NewParking);

export default router