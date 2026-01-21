import e, { Router } from "express";
import AuthController from "../controllers/auth/auth.controller.js";

const router = Router();

router.post('/auth/signup',AuthController.signup)

export default router;