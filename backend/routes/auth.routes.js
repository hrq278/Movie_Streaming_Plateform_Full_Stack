import express from "express";
import { login, logout, refreshAccessToken, signUp } from "../controllers/auth.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";

const router = express.Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/logout",verifyJWT, logout)
router.post("/refresh-access-token", refreshAccessToken)

export default router