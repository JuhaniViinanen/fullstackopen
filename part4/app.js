const express =  require("express")
const app = express()
const blogsRouter = require("./controllers/blogs")
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")

logger.info("connecting to ", config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connection successful")
  })
  .catch(error => {
    logger.error("MongoDB connection error: ", error.message)
  })

app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/blogs", blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app