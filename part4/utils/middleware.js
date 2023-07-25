const logger = require("./logger")

const requestLogger = (req, res, next) => {
    logger.info(req.method, req.path, req.body)
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).json({ error: "unknown endpoint" })
}

const errorHandler = (error, req, res, next) => {
    logger.error(error.message)

    if (error.name === "CastError") {
        return res.status(400).json({ error: error.message })
    } else if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}
