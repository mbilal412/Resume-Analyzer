import express from "express";
import { clerkMiddleware } from '@clerk/express'
import authRouter from "./routes/auth.routes.js";
import webhookRoutes from './routes/webhook.routes.js'


const app = express();
app.use('/api/webhooks/clerk', express.raw({ type: 'application/json' }))

app.use(express.json());

app.use(clerkMiddleware())

app.use('/api/auth', authRouter);
app.use('/api/webhooks', webhookRoutes)


export default app;