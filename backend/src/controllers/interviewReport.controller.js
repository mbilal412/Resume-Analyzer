import InterviewReportModel from '../models/interviewReport.model.js';
import { getAuth } from "@clerk/express";
import userModel from '../models/user.model.js';

export const getInterviewReport = async (req, res) => {
    const auth = getAuth(req);
    if (!auth || !auth.userId) {
        return res.status(401).json({ error: "Unauthorized!" });
    }
    // getting the report by id from the request params
    const reportId = req.params.id;
    const userId = auth.userId;
    const mongoUserId = (await userModel.findOne({ clerkId: userId }))._id;

    try {
        const report = await InterviewReportModel.findOne({ _id: reportId, userId: mongoUserId });
        if (!report) {
            return res.status(404).json({ error: "Report not found!" });
        }
        res.status(200).json({
            message: "Report fetched successfully!",
            report
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error!", details: error.message });
    }
};

export const getAllInterviewReports = async (req, res) => {

    const auth = getAuth(req);

    if(!auth || !auth.userId) {
        return res.status(401).json({ error: "Unauthorized!" });
    }

    const userId = auth.userId;
    const mongoUserId = (await userModel.findOne({ clerkId: userId }))._id;

    try {
        const reports = await InterviewReportModel.find({ userId: mongoUserId });
        res.status(200).json({
            message: "Reports fetched successfully!",
            reports
        });
    }catch (error) {
        res.status(500).json({ error: "Internal server error!", details: error.message });
    }

};