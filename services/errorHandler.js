// Middleware wrapper pour capturer les erreurs des fonctions async
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Middleware global de gestion d'erreurs
const errorHandler = (err, req, res, next) => {
    console.error('Erreur interceptée:', err);

    const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode).json({
        success: false,
        message: err.message || 'Une erreur est survenue',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = { asyncHandler, errorHandler };
