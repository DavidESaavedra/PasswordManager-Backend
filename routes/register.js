import express from "express";
const router = express.Router();
import register from "../controllers/registerController.js";

router.post("/", register.handleRegister);

export default router;
