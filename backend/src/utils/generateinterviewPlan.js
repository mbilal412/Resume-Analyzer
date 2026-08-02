import Groq from "groq-sdk";
import { jobDescription, resume, systemPrompt, InterviewAnalysisSchema } from './temp.js';
import { z } from "zod";


const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const model = "openai/gpt-oss-20b";


export async function getInterviewPlan() {
    try {
        const chatCompletion = await getGroqChatCompletion();
        const result = JSON.parse(chatCompletion.choices[0]?.message?.content);
        result.modelUsed = model;
        return result;

    } catch (error) {
        throw error;
    }
}

export async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: systemPrompt,
            },
            {
                role: "user",
                content: `Job Description: ${jobDescription}\n\nResume: ${resume}`,
            }
        ],
        model: model,
        response_format: {
            type: "json_schema",
            json_schema: {
                name: "InterviewReport",
                strict: true,
                schema: z.toJSONSchema(InterviewAnalysisSchema),
            }
        },
    });
}
