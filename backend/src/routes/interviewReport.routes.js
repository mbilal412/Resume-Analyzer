import express from 'express';
import { getInterviewReport, getAllInterviewReports } from '../controllers/interviewReport.controller.js';

const router = express.Router();

router.get('/interview-report/:id', getInterviewReport)
router.get('/interview-reports', getAllInterviewReports)

export default router;