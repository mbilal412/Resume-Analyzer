import { getAuth } from '@clerk/express'
import { sendError } from '../utils/response.js'
import userModel from '../models/user.model.js'

export const requireAuth = (req, res, next) => {
    const auth = getAuth(req)

    if (!auth || !auth.userId) {
        return sendError(res, 'Unauthorized!', 401)
    }


    let mongoUserId;

    try {
        const user = await userModel.findOne({ clerkId: auth.userId });
        if (!user) {
            console.log(`User with clerkId ${auth.userId} not found in the database.`);
            return sendError(res, "User not found!", 404);
        }
        mongoUserId = user._id;
    } catch (error) {
        return sendError(res, "Failed to fetch user from database", 500);
    }

    req.auth = { ...auth, mongoUserId };
    next()
}