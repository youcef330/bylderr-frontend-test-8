const sanitizeInput = (input) => {
    // Trim whitespace
    let sanitized = input.trim();

    // Remove any unwanted characters (keep letters, numbers, spaces, commas, and periods)
    sanitized = sanitized.replace(/[^a-zA-Z0-9,.-]/g, '');

    // Limit input length to 100 characters
    if (sanitized.length > 100) {
        sanitized = sanitized.substring(0, 100);
    }

    return sanitized;
};

export default sanitizeInput;