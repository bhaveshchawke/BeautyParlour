const express = require("express");
const server = express();
const dotenv = require("dotenv");
const db = require("./config/db");
const cors = require("cors");
//middleware//
dotenv.config();
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
