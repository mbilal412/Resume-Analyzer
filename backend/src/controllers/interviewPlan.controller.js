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
    const mongoUserId = (await userModel.findOne({ clerkId: userId }))._id;

    // Extract job description and resume from the request
    const { jobDescription } = req.body
    if (!jobDescription || !req.file) {
        return res.status(400).json({ error: "Job description and resume file are required." });
    }
    const resume = await (new PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const resumeContent = resume.text;

    // Calling the getInterviewPlan function to generate the interview report

    let lastError;
    const maxRetries = 2;
    let interviewReport;
    let file;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Generate the interview report
            interviewReport = await getInterviewPlan(resumeContent, jobDescription)
            // Uploading resume to ImageKit
            try {
                file = await client.files.upload({
                    file: await toFile(req.file.buffer, 'file.pdf', { type: req.file.mimetype }),
                    fileName: `resume_${Date.now()}.pdf`,
                    folder: 'crack-it/resumes'
                })
            } catch (error) {
                return res.status(500).json({ error: 'Failed to upload resume to ImageKit' });
            }

            break; // Exit the loop if successful

        } catch (error) {
            lastError = error;
            if (attempt === maxRetries) {
                return res.status(500).json({ message: 'Error generating interview report' });
            }

        }
    }

    // Creating a new interview report in the database
    let newReport;
    try{
        newReport = await InterviewReportModel.create({
        userId: mongoUserId,
        matchScore: interviewReport.matchScore,
        jobTitle: interviewReport.jobTitle,
        jobDescription: jobDescription,
        resume: file.url, // Store the URL of the uploaded resume
        summary: interviewReport.summary,
        recommendation: interviewReport.recommendation,
        technicalQuestions: interviewReport.technicalQuestions,
        skillGaps: interviewReport.skillGaps,
        generatedBy: interviewReport.modelUsed
    })
    }catch (error) {
        return res.status(500).json({ error: 'Error saving interview report to database' });
    }

    return res.status(201).json({
        message: 'Interview report created successfully',
        data: newReport
    });
}