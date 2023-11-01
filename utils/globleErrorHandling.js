module.exports = (err, req, res, next) => {
    const status = err.status || 'fail'
    const statusCode = err.statusCode || '404'
    const message = err.message || 'internal server error'

    res.status(statusCode).json({
        status:status,
        message:message
    })
}