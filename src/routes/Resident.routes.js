import { Router } from "express";
import { GetResident, GetResidents, GetResidentsPayment, UpdateResident } from "../controllers/Resident.controller.js";

const router = Router()

router.get("/Resident", GetResident);

router.get("/ResidentPayment", GetResidentsPayment);

router.get("/Residents", GetResidents);

router.patch("/Resident", UpdateResident)

router.delete("/Resident/:id")

export default router