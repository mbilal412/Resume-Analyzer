import { sendSuccess, sendError } from "../utils/response.js";
export const getMeController = (req, res) => {
    return sendSuccess(res, "User fetched successfully", { userId: req.auth?.userId }, 200);
};