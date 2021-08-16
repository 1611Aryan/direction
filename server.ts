import Express from "express"
import morgan from "morgan"
import helmet from "helmet"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"

import UserRouter from "./Routes/routes"

import { config } from "dotenv"
process.env.development !== "production" && config()

const PORT = process.env.PORT || 5000

const app = Express()

app.use(Express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(
  cors({
    origin:
      process.env.development === "production"
        ? "https://iiche-recruitments.netlify.app/"
        : "http://localhost:3000",
    credentials: true,
  })
)
app.use(cookieParser())
const MongoURI = process.env.MONGODB_URI

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

mongoose.connect(MongoURI, mongoOptions)

const connection = mongoose.connection

connection.once("open", () =>
  console.log("\x1b[36mDatabase is Connected\x1b[0m")
)

app.use("/", UserRouter)

app.listen(PORT, () => console.log(`The server is running at port ${PORT}`))
