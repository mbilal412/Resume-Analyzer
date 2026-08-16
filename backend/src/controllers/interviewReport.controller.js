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
        return sendError(res, "Please provide a job description.", 400);
    }
    if (!req.file) {
        return sendError(res, "Please upload a resume file.", 400);
    }



    // Parse the PDF resume
    let resumeContent;
    try {
        resumeContent = await parseResumePdf(req.file.buffer);
    } catch (error) {
        console.error('Error parsing resume PDF:', error);
        if (error.message === 'Resume content is empty after parsing.') {
            return sendError(res, "Your resume appears to be empty. Please try another file.", 400);
        }
        return sendError(res, "We couldn't read your resume. Please make sure it's a valid PDF.", 400);
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
                console.error('Error uploading resume to file service:', error);
                return sendError(res, "Something went wrong uploading your file. Please try again.", 500);
            }

            break; // Exit the loop if successful

        } catch (error) {
            console.error(`Interview report generation attempt ${attempt} failed:`, error);
            if (attempt === maxRetries) {
                return sendError(res, "We couldn't generate your report. Please try again.", 500);
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
        console.error('Error saving interview report:', error);
        return sendError(res, "We couldn't save your report. Please try again.", 500);
    }

    return sendSuccess(res, "Interview report created successfully", newReport, 201);
};

export const getInterviewReport = async (req, res) => {

    const reportId = req.params.id;
    if (!reportId || !mongoose.Types.ObjectId.isValid(reportId)) {
        return sendError(res, "Report not found. Please check the ID and try again.", 400);
    }

    // Fetch mongoUserId safely
    const mongoUserId = req.auth?.mongoUserId;

    try {
        const report = await InterviewReportModel.findOne({ _id: reportId, userId: mongoUserId });
        if (!report) {
            return sendError(res, "This report doesn't exist or you don't have access to it.", 404);
        }
        return sendSuccess(res, "Report fetched successfully!", report, 200);
    } catch (error) {
        console.error('Error fetching report:', error);
        return sendError(res, "Something went wrong. Please try again.", 500);
    }
};

export const getAllInterviewReports = async (req, res) => {

    const mongoUserId = req.auth?.mongoUserId;

    try {
        const reports = await InterviewReportModel.find({ userId: mongoUserId }).sort({ createdAt: -1 });
        return sendSuccess(res, "Reports fetched successfully!", reports, 200);
    } catch (error) {
        console.error('Error fetching reports for user:', error);
        return sendError(res, "Something went wrong. Please try again.", 500);
    }
};






