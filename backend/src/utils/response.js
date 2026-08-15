/**
 * Send a standardized success response
 * @param {import('express').Response} res
 * @param {string} message
 * @param {any} [data]
 * @param {number} [statusCode=200]
 */
export const sendSuccess = (res, message, data = undefined, statusCode = 200) => {
    const payload = { success: true, message };
    if (data !== undefined) payload.data = data;
    return res.status(statusCode).json(payload);
};

/**
 * Send a standardized error response
 * @param {import('express').Response} res
 * @param {string} message
 * @param {number} [statusCode=500]
 */
export const sendError = (res, message, statusCode = 500) => {
    return res.status(statusCode).json({ success: false, message });
};
