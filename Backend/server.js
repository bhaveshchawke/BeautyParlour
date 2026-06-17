const express = require("express");
const server = express();
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo").default || require("connect-mongo");
const db = require("./config/db");
const cors = require("cors");
//middleware//
dotenv.config();
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
    },
  }),
);
server.use(express.json());
server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);
//routes import//
const authRoute = require("./Routes/authRoute");

//route use//
server.use("/api/auth", authRoute);

const PORT = process.env.PORT || 3000;

server.listen(PORT, async () => {
  try {
    await db();
    console.log(`server is listning on port:${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
