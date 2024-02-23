import express from "express";
const router = express.Router();
import logout from "../controllers/logoutController.js";

router.get("/", logout.handleLogout);

export default router;
