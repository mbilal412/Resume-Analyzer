import { MessageAttempt } from 'svix/dist/api/messageAttempt.js';
import InterviewReportModel from '../models//interviewReport.model.js';
import { getInterviewPlan } from '../utils/generateinterviewPlan.js';

export const createInterviewReport = async (req, res) => {
    try {
        const interviewReport = await getInterviewPlan()
        res.status(201).json({
            message: 'Interview report created successfully',
            data: interviewReport
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}