require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const helmet = require("helmet")
const rateLimit = require("express-rate-limit")
const cors = require("cors")
const cloudinary = require("cloudinary").v2

const app = express()
const PORT = process.env.PORT || 5000

app.set("trust proxy", "loopback")

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret
})

app.use(
  cors({
    origin: [
      "https://fizika360.uz",
      "https://www.fizika360.uz",
      // "http://localhost:5173"
    ],
    // origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
)
//testing ip for ip and socketip, they should not be the same
// app.get('/debug-ip', (req, res) => {
//   res.json({
//     ip: req.ip,
//     socketIp: req.socket.remoteAddress,
//     forwardedFor: req.headers['x-forwarded-for'],
//     ips: req.ips,
//   });
// });

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 300,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  })
)
app.use(helmet())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ ok: true, message: "API is running" })
})
// Prevent database-dependent requests before readiness
app.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: "Database temporarily unavailable",
    })
  }
  next()
})

app.use("/auth", require("./routes/authorization"))
app.use("/test", require("./routes/test"))
app.use("/user", require("./routes/user"))
app.use("/grade", require("./routes/grade"))

// Global error handler — must be after all routes
app.use((err, req, res, next) => {
  const timestamp = new Date().toISOString()

  console.error("========== API ERROR ==========")
  console.error("Time:", timestamp)
  console.error("Method:", req.method)
  console.error("URL:", req.originalUrl)
  console.error("IP:", req.ip)
  console.error("Message:", err.message)
  console.error("Stack:", err.stack)
  console.error("================================")

  if (res.headersSent) {
    return next(err)
  }

  const status = err.status >= 400 && err.status <= 599 ? err.status : 500

  res.status(status).json({
    message: status >= 500 ? "Internal server error" : err.message,
  })
})

mongoose.connection.on("error", (error) => {
  console.error("[MONGODB ERROR]", error)
})

mongoose.connection.on("disconnected", () => {
  console.warn("[MONGODB] Connection lost")
})

mongoose.connection.on("reconnected", () => {
  console.log("[MONGODB] Reconnected")
})

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("DB connected successfully")

    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`)
    })
  } catch (error) {
    console.error("DB connection failed:", error)
    process.exit(1)
  }
}

start()
