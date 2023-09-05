import { Router } from "express";
import { GetPay, GetPays, NewPay, UpdatePay } from "../controllers/Pay.controller.js";

const router = Router()

router.post("/Pay", NewPay);

router.get("/Pay", GetPay);

router.get("/Pays", GetPays);

router.patch("/Pay", UpdatePay);

export default router