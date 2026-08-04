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
const behavioralQuestionsSchema = new mongoose.Schema({
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

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true,
    },
    tasks: [{
        type: String,
        required: true,
    }],

}, {
    _id: false
})



const interviewReportSchema = new mongoose.Schema({
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
    technicalQuestions: [technicalQuestionsSchema],
    behavioralQuestions: [behavioralQuestionsSchema],
    skillGaps: [skillGapsSchema],
    preparationPlan: [preparationPlanSchema],
    generatedBy: {
        type: String,
        required: true,
    }
})

const InterviewReportModel = mongoose.model('InterviewReport', interviewReportSchema);
export default InterviewReportModel;