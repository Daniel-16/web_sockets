const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const { Server } = require("socket.io");
const io = new Server(server);

//Middleware
app.use(cors());

io.on("connection", (socket) => {
  console.log("user connected");
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});
