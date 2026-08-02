import express from 'express';
import { createInterviewReport } from '../controllers/interviewPlan.controller.js';

const router = express.Router();

router.get('/interview', createInterviewReport);

export default router;