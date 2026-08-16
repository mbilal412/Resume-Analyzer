import { getAuth } from '@clerk/express'
import { sendError } from '../utils/response.js'
import userModel from '../models/user.model.js'

export const requireAuth = async (req, res, next) => {
    const auth = getAuth(req)

    if (!auth || !auth.userId) {
        return sendError(res, 'You need to sign in to continue.', 401)
    }


    let mongoUserId;

    try {
        const user = await userModel.findOne({ clerkId: auth.userId });
        if (!user) {
            return sendError(res, "Your account could not be found. Please sign in again.", 404);
        }
        mongoUserId = user._id;
    } catch (error) {
        console.error('Error fetching user from database:', error);
        return sendError(res, "Something went wrong on our end. Please try again.", 500);
    }

    req.auth = { ...auth, mongoUserId };
    next()
}