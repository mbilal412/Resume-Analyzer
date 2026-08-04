import express from 'express';
import { createInterviewReport } from '../controllers/interviewPlan.controller.js';
import upload from '../middlewares/file.middleware.js';

const router = express.Router();

router.post('/generate-preparation-plan', upload.single('resume'), createInterviewReport);

export default router;