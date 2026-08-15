import express from "express";
import { getMeController } from "../controllers/auth.controller.js";
import { requireAuth } from "../middlewares/requireAuth.middleware.js";


const router = express.Router();

router.get('/me', requireAuth, getMeController);

export default router;