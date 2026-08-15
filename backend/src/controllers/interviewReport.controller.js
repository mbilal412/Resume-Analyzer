import InterviewReportModel from '../models/interviewReport.model.js';
import userModel from '../models/user.model.js';
import { sendSuccess, sendError } from '../utils/response.js';
import mongoose from 'mongoose';
import { getInterviewPlan } from '../utils/generateinterviewPlan.js';
import { parseResumePdf, uploadResumeToImageKit } from '../utils/resumeFileUtils.js';

export const createInterviewReport = async (req, res) => {
    const mongoUserId = req.auth?.mongoUserId;

    // Extract and validate job description and resume
    const { jobDescription } = req.body;
    if (!jobDescription || typeof jobDescription !== 'string' || !jobDescription.trim()) {
        return sendError(res, "Job description is required and must be a non-empty string.", 400);
    }
    if (!req.file) {
        return sendError(res, "Resume file is required.", 400);
    }



    // Parse the PDF resume
    let resumeContent;
    try {
        resumeContent = await parseResumePdf(req.file.buffer);
    } catch (error) {
        return sendError(res, error.message === 'Resume content is empty after parsing.' ? "Resume content is empty after parsing." : "Failed to parse resume PDF", 400);
    }



    // Generate interview report with retries
    let lastError;
    const maxRetries = 2;
    let interviewReport;
    let file;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            interviewReport = await getInterviewPlan(resumeContent, jobDescription);

            // Upload resume to ImageKit
            try {
                file = await uploadResumeToImageKit(req.file);
            } catch (error) {
                return sendError(res, "Failed to upload resume to ImageKit", 500);
            }

            break; // Exit the loop if successful

        } catch (error) {
            // lastError = error;
            if (attempt === maxRetries) {
                return sendError(res, "Error generating interview report", 500);
            }
        }
    }

    // Save interview report to the database
    let newReport;
    try {
        newReport = await InterviewReportModel.create({
            userId: mongoUserId,
            matchScore: interviewReport.matchScore,
            jobTitle: interviewReport.jobTitle,
            jobDescription: jobDescription,
            resume: file.url,
            summary: interviewReport.summary,
            recommendation: interviewReport.recommendation,
            technicalQuestions: interviewReport.technicalQuestions,
            skillGaps: interviewReport.skillGaps,
            generatedBy: interviewReport.modelUsed
        });
    } catch (error) {
        return sendError(res, "Error saving interview report to database", 500);
    }

    return sendSuccess(res, "Interview report created successfully", newReport, 201);
};

export const getInterviewReport = async (req, res) => {

    const reportId = req.params.id;
    if (!reportId || !mongoose.Types.ObjectId.isValid(reportId)) {
        return sendError(res, "Invalid or missing Report ID!", 400);
    }

    // Fetch mongoUserId safely
    const mongoUserId = req.auth?.mongoUserId;

    try {
        const report = await InterviewReportModel.findOne({ _id: reportId, userId: mongoUserId });
        if (!report) {
            return sendError(res, "Report not found!", 404);
        }
        return sendSuccess(res, "Report fetched successfully!", report, 200);
    } catch (error) {
        return sendError(res, "Internal server error!", 500);
    }
};

export const getAllInterviewReports = async (req, res) => {

    const mongoUserId = req.auth?.mongoUserId;

    try {
        const reports = await InterviewReportModel.find({ userId: mongoUserId });
        return sendSuccess(res, "Reports fetched successfully!", reports, 200);
    } catch (error) {
        return sendError(res, "Internal server error!", 500);
    }
};






