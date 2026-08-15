import express from 'express';
import { getInterviewReport, getAllInterviewReports, createInterviewReport } from '../controllers/interviewReport.controller.js';
import { requireAuth } from '../middlewares/requireAuth.middleware.js';
import upload from '../middlewares/file.middleware.js';
import multerErrorHandler from '../middlewares/multerError.middleware.js';

const router = express.Router();

router.post('/', requireAuth, upload.single('resume'), multerErrorHandler, createInterviewReport);
router.get('/:id', requireAuth, getInterviewReport);
router.get('/', requireAuth, getAllInterviewReports)

export default router;


