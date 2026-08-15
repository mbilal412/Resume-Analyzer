import Groq from "groq-sdk";
import { systemPrompt, InterviewAnalysisSchema, resume } from './systemPrompt.js';
import { z } from "zod";


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = "openai/gpt-oss-20b";

const jsonSchema = z.toJSONSchema(InterviewAnalysisSchema);


export async function getInterviewPlan(resumeContent, jobDescription) {
    try {
        const chatCompletion = await getGroqChatCompletion(resumeContent, jobDescription);
        const result = JSON.parse(chatCompletion.choices[0]?.message?.content);
        result.modelUsed = model;
        return result;

    } catch (error) {
        throw error;
    }
}

export async function getGroqChatCompletion(resumeContent, jobDescription) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: `Job Description: ${jobDescription}\n\nResume: ${resumeContent}`,
            }
        ],
        model: model,
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "InterviewReport",
                strict: true,
                schema: jsonSchema,
            }
        },
    });
}
