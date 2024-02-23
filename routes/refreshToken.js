import express from "express";
const router = express.Router();
import refreshToken from "../controllers/refreshTokenController.js";

router.get("/", refreshToken.handleRefreshToken);

export default router;
