const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

//Middleware
app.use(cors());

io.on("connection", (socket) => {
  console.log(`user connected, id: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id ${socket.id} has joined room ${data}`);
  });
  socket.on("disconnect", () => {
    console.log(`User disconnected, id: ${socket.id}`);
  });
});

server.listen(process.env.PORT || 4000, () => {
  console.log(`Listening on port ${process.env.PORT || 4000}`);
});
