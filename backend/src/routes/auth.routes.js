import express from "express";
import { getMeController } from "../controllers/auth.controller.js";


const router = express.Router();

router.get('/me', getMeController);

export default router;