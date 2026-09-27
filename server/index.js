const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 5000
const cloudinary = require("cloudinary").v2
require("dotenv").config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
})
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
)
app.use(helmet())
app.use(express.json())
app.use("/auth", require("./routes/authorization"))
app.use("/test", require("./routes/test"))
app.use("/user", require("./routes/user"))
app.use("/grade", require("./routes/grade"))

async function start() {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`)
    })
    app.get("/", (req, res) => {
      res.status(200).json({
        ok: true,
        message: "API is running",
      })
    })
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB connected successfully")
  } catch (error) {
    console.error("DB connection failed:", error)
    process.exit(1)
  }
}

start()
