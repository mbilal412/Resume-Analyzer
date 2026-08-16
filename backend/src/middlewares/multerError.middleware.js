import multer from 'multer';
import { sendError } from '../utils/response.js';

/**
 * Express error-handling middleware for Multer upload errors.
 * Must have exactly 4 arguments to be recognized as an error handler by Express.
 */
const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error('Multer upload error:', err);
        return sendError(res, "Please upload a valid PDF file under 10MB.", 400);
    }
    console.error('File upload error:', err);
    return sendError(res, "Something went wrong on our end. Please try again.", 500);
};

export default multerErrorHandler;
