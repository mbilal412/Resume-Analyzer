import { MessageAttempt } from 'svix/dist/api/messageAttempt.js';
import InterviewReportModel from '../models//interviewReport.model.js';
import { getInterviewPlan } from '../utils/generateinterviewPlan.js';
import {PDFParse } from 'pdf-parse';

export const createInterviewReport = async (req, res) => {


    const {jobDescription} = req.body

    const resume = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const resumeContent = resume.text;

    let lastError;

    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            const interviewReport = await getInterviewPlan(resumeContent, jobDescription)
            return res.status(201).json({
                message: 'Interview report created successfully',
                data: interviewReport
            });
        } catch (error) {
            lastError = error;

        }
    }
    console.error('Error generating interview report:', lastError);
    res.status(500).json({ message: 'Internal server error' });
}