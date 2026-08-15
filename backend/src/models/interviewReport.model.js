import mongoose from 'mongoose';


const technicalQuestionsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    }
}, {
    _id: false
})


const skillGapsSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true,
    },
    importance: {
        type: String,
        enum: ['low', 'medium', 'high'],
        required: true,
    }
}, {
    _id: false
})

const interviewReportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    generatedBy: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    recommendation: {
        type: String,
        required: true,
    },
    technicalQuestions: [technicalQuestionsSchema],
    skillGaps: [skillGapsSchema],
}, {
    timestamps: true
})

interviewReportSchema.index({ userId: 1, createdAt: -1 }); // Index for efficient querying by userId and sorting by createdAt

const InterviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);
export default InterviewReportModel;