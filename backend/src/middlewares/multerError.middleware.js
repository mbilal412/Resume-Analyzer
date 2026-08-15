import multer from 'multer';
import { sendError } from '../utils/response.js';

/**
 * Express error-handling middleware for Multer upload errors.
 * Must have exactly 4 arguments to be recognized as an error handler by Express.
 */
const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return sendError(res, err.message, 400);
    }
    return sendError(res, err.message || "Internal server error!", 500);
};

export default multerErrorHandler;
