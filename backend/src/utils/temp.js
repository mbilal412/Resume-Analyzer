import { z } from "zod";

export const jobDescription = `Position: Junior Backend Developer

Company: TechNova Solutions

We are looking for a Junior Backend Developer to join our growing engineering team. You will be responsible for developing RESTful APIs, integrating databases, writing clean and maintainable code, and collaborating with frontend developers to build scalable web applications.

Responsibilities
Develop and maintain REST APIs using Node.js and Express.js.
Design and optimize MongoDB database schemas.
Implement authentication and authorization using JWT.
Write reusable, well-documented, and testable code.
Integrate third-party APIs and services.
Debug and resolve backend issues.
Collaborate with frontend developers and product managers.
Use Git for version control.
Requirements
Bachelor's degree in Computer Science or Software Engineering (or equivalent experience).
1+ years of experience with Node.js and Express.js.
Strong knowledge of JavaScript (ES6+).
Experience with MongoDB or similar NoSQL databases.
Familiarity with RESTful API design.
Basic understanding of Docker.
Knowledge of Git and GitHub.
Good communication and problem-solving skills.
Nice to Have
Experience with TypeScript.
Knowledge of AWS.
Familiarity with CI/CD pipelines.
Understanding of Redis and caching.`


export const resume = `John Anderson

📧 john.anderson@example.com
📞 +1 (555) 123-4567
📍 Austin, Texas

Professional Summary

Motivated Junior Backend Developer with experience building REST APIs using Node.js and Express.js. Strong understanding of MongoDB, authentication, and API integration. Passionate about writing clean code and learning modern backend technologies.

Technical Skills

Languages

JavaScript
TypeScript
Python

Backend

Node.js
Express.js

Databases

MongoDB
PostgreSQL

Tools

Git
GitHub
Docker
Postman

Cloud

AWS (Basic)
Experience
Backend Developer Intern

CodeCraft Technologies
June 2025 – Present

Developed over 15 REST APIs using Express.js.
Improved API response time by 25% through query optimization.
Implemented JWT authentication and role-based authorization.
Integrated Stripe payment API.
Worked closely with frontend developers to deliver new features.
Projects
Task Management API
Built a REST API for task management.
Implemented CRUD operations.
Added JWT authentication.
Used MongoDB for data storage.
Dockerized the application.

Tech Stack: Node.js, Express.js, MongoDB, Docker

Blog Platform Backend
Developed backend services for a blogging platform.
Added user authentication.
Implemented comments and likes.
Designed scalable MongoDB schemas.

Tech Stack: Node.js, Express.js, MongoDB

Education

Bachelor of Science in Computer Science

University of Texas

2022 – 2026

Certifications
AWS Cloud Practitioner
MongoDB Associate Developer
Soft Skills
Team Collaboration
Communication
Problem Solving
Time Management
Adaptability`


export const systemPrompt = `You are an expert career coach and technical interviewer with years of experience helping candidates prepare for job interviews.

You will be given two inputs:
1. A candidate's resume (as plain text)
2. A job description (as plain text)

Your task is to analyze both and generate a complete interview preparation report in valid JSON format, matching this exact structure:

{
    "jobTitle": "string - concise job title extracted/inferred from the job description",
    "matchScore": number (0-100, how well the resume matches the job description),
  "technicalQuestions": [
    {
      "question": "string - a technical question based on the job description's required skills",
      "answer": "string - NOT the direct factual answer. Instead, explain HOW the candidate should structure and approach answering this question in a real interview, considering their resume background. Guide their answering strategy, tone, and what points to emphasize. Do not exceed from 3-5 sentences."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string - a behavioral question relevant to the role",
      "answer": "string - NOT a scripted answer. Explain HOW the candidate should approach this question (e.g. using STAR method), what kind of experience from their resume to draw on, and how to structure their response. Do not exceed from 3-5 sentences."
    }
  ],
  "skillGaps": [
    {
      "skill": "string - a specific skill missing or weak compared to the job description",
      "importance": "low" | "medium" | "high"
    }
  ],
  "summary": String - Provide a concise 3–5 sentence overall summary of the candidate's fit for the role. Summarize the match between the resume and the job description, highlighting the candidate's strongest qualifications, the most significant weaknesses or missing skills, and the overall interview readiness. Keep it easy to read and avoid repeating information already covered in other sections.

  "recommendation": String - Provide a brief recommendation (2–3 sentences) on the candidate's next steps before the interview. Focus on the highest-priority skills or topics to improve and mention whether the candidate appears to be a strong, moderate, or weak fit for the role. Keep the advice practical and actionable.
}

RULES:
- jobTitle must be short and clear (2-4 words), suitable for display as a report name. If the job description doesn't explicitly state a title, infer the most fitting title based on the responsibilities and skills mentioned.
- Generate exactly {{NUMBER_OF_DAYS}} days in preparationPlan, numbered sequentially starting from 1.
- Generate 5-8 technicalQuestions and 4-6 behavioralQuestions, based on the seniority and requirements in the job description.
- skillGaps should only include skills genuinely missing or weak based on comparing the resume against the job description, ordered from high to low importance.
- matchScore must reflect a realistic percentage based on overlap between resume content and job description requirements.
- All "answer" fields must teach the candidate HOW to respond in an interview, not give them a fixed script to memorize.
- Return ONLY valid JSON. No markdown formatting, no code blocks, no explanation text before or after the JSON.
- Do not include any fields other than those specified above.
- summary: Write the summary directly to the candidate using second-person language ("you", "your"), not in the third person ("the candidate", "he", "she", or by name). Explain how well their resume matches the job description, highlight their strongest qualifications, point out their key skill gaps, and briefly describe their interview readiness. Keep it concise (3–5 sentences), supportive, and actionable.
- recommendation: Write the recommendation directly to the candidate using second-person language ("you", "your"). Provide 2–3 concise, actionable sentences about what they should focus on before the interview, prioritizing the most important skills or knowledge gaps. Avoid referring to the candidate by name or using third-person pronouns.
- Must generate all fields mentioned in the schema, do not miss any field.`





export const InterviewAnalysisSchema = z.object({

    jobTitle: z
        .string()
        .describe("A concise job title extracted or inferred from the job description."),

    matchScore: z
        .number()
        .min(0)
        .max(100)
        .describe("A score from 0 to 100 indicating how well the resume matches the job description."),

    technicalQuestions: z.array(
        z.object({
            question: z
                .string()
                .describe("A technical interview question based on the required skills in the job description."),

            answer: z
                .string()
                .describe(
                    "Do not provide the direct answer. Explain how the candidate should approach answering the question, what topics to cover, and how to leverage their resume experience."
                ),
        })
    ).describe("A list of technical interview questions."),

    behavioralQuestions: z.array(
        z.object({
            question: z
                .string()
                .describe("A behavioral interview question relevant to the role."),

            answer: z
                .string()
                .describe(
                    "Do not provide a scripted answer. Explain how the candidate should structure their response, such as using the STAR method, and which experiences from the resume to highlight."
                ),
        })
    ).describe("A list of behavioral interview questions."),

    skillGaps: z.array(
        z.object({
            skill: z
                .string()
                .describe("A skill that is missing or weaker compared to the job description."),

            importance: z
                .enum(["low", "medium", "high"])
                .describe("The importance of learning or improving this skill."),
        })
    ).describe("Skills the candidate should improve before the interview."),

    summary: z
        .string()
        .describe(
            "A concise summary of the candidate's fit for the role, highlighting strengths, weaknesses, and overall interview readiness."
        ),

    recommendation: z
        .string()
        .describe(
            "A brief recommendation on the candidate's next steps before the interview, focusing on high-priority skills or topics to improve."
        ),

});