import "express-async-errors"
import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connect.js"
import notFoundMiddleware from "./middleware/not-found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"
import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"
import morgan from "morgan"

const app = express()

dotenv.config()

app.use(express.json())

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"))
}

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`server listening on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
