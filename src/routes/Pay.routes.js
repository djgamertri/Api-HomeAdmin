import { Router } from "express";
import { GetPay, GetPays, NewPay } from "../controllers/Pay.controller.js";

const router = Router()

router.post("/Pay", NewPay);

router.get("/Pay", GetPay);

router.get("/Pays", GetPays);

export default router