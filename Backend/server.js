const express = require("express");
const server = express();
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo").default || require("connect-mongo");
const db = require("./config/db");
const cors = require("cors");

// Security and Performance packages
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const morgan = require("morgan");

//middleware//
dotenv.config();

// Security HTTP headers
server.use(helmet());

// Request monitoring
server.use(morgan("dev"));

// Trust proxy required for express-rate-limit on Vercel
server.set("trust proxy", 1);

// Global Rate Limiting - DDoS protection
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // Global limit of 500 requests per 15 minutes per IP
  message: "Too many requests from this IP, please try again after 15 minutes",
});
server.use("/api", limiter);

server.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Required for cross-origin
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Required for Vercel
    },
  }),
);
server.use(express.json());

// Payload compression
server.use(compression());

server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
//routes import//
const authRoute = require("./Routes/authRoute");
const appointmentRoute = require("./Routes/appointmentRoute");
const adminRoute = require("./Routes/adminRoute");
const serviceRoute = require("./Routes/serviceRoute");
const productRoute = require("./Routes/productRoute");
//route use//
server.use("/api/auth", authRoute);
server.use("/api/appointment", appointmentRoute);
server.use("/api/admin", adminRoute);
server.use("/api/services", serviceRoute);
server.use("/api/product", productRoute);

// Root route to check if backend is running (fixes the 404 on Homepage)
server.get("/", (req, res) => {
  res.send("Beauty Parlour Backend is Running Perfectly! 🚀");
});

const PORT = process.env.PORT || 3000;

// Vercel Serverless Fix: Connect to DB outside of server.listen
db()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

// Only run listen in local environment (Vercel uses module.exports)
if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
}

// Export the Express API for Vercel Serverless functions
module.exports = server;
