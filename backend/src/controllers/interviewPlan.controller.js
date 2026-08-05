import { MessageAttempt } from 'svix/dist/api/messageAttempt.js';
import InterviewReportModel from '../models//interviewReport.model.js';
import { getInterviewPlan } from '../utils/generateinterviewPlan.js';
import { getAuth } from "@clerk/express";
import { PDFParse } from 'pdf-parse';
import ImageKit, { toFile } from '@imagekit/nodejs';
import userModel from '../models/user.model.js';

const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const createInterviewReport = async (req, res) => {

    // Authentication check
    const auth = getAuth(req);
    if (!auth || !auth.userId) {
        return res.status(401).json({ error: "Unauthorized!" });
    }

    // Get the user ID and mongoUuserId from the authenticated user
    const userId = auth.userId;
    const mongoUserId = userModel.findOne({ clerkId: userId })._id;

    console.log('Authenticated user ID:', userId);
    console.log('Mongo user ID:', mongoUserId);

    // Extract job description and resume from the request
    const { jobDescription } = req.body
    const resume = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const resumeContent = resume.text;

    // Calling the getInterviewPlan function to generate the interview report

    let lastError;

    for (let attempt = 1; attempt <= 2; attempt++) {
        try {
            // Generate the interview report
            const interviewReport = await getInterviewPlan(resumeContent, jobDescription)
            // Uploading resume to ImageKit
            try {
                const file = await client.files.upload({
                    file: await toFile(req.file.buffer, 'file.pdf', { type: req.file.mimetype }),
                    fileName: `resume_${Date.now()}.pdf`,
                    folder: 'crack-it/resumes'
                })
            } catch (error) {
                console.error('Error uploading resume to ImageKit:', error);
                return res.status(500).json({ error: 'Failed to upload resume to ImageKit' });
            }

            // Creating a new interview report in the database
            const newReport = InterviewReportModel.create({
                userId: mongoUserId,
                jobTitle: interviewReport.jobTitle,
                jobDescription: jobDescription,
                resume: file.url, // Store the URL of the uploaded resume
                summary: interviewReport.summary,
                recommendation: interviewReport.recommendation,
                technicalQuestions: interviewReport.technicalQuestions,
                behavioralQuestions: interviewReport.behavioralQuestions,
                skillGaps: interviewReport.skillGaps,
                generatedBy: interviewReport.modelUsed
            })
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