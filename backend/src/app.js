import express from "express";
import { clerkMiddleware } from '@clerk/express'
import authRouter from "./routes/auth.routes.js";
import webhookRoutes from './routes/webhook.routes.js'
import interviewRoutes from './routes//interview.routes.js'
import cors from 'cors';


const app = express();
app.use('/api/webhooks/clerk', express.raw({ type: 'application/json' }))

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(clerkMiddleware())

app.use('/api/auth', authRouter);
app.use('/api/webhooks', webhookRoutes)
app.use('/api', interviewRoutes);


export default app;