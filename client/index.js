import express from "express";
import http from "http";
import { Server } from "socket.io";
import { SocketHandlers } from "./src/socketHandlers.js";
const app = express();
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Welcome to a good starting");
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connected successfully");
  const socketHandlers = new SocketHandlers();
  socketHandlers.createSocketHandler(socket);
  socket.on("event", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

io.on("GetAllUsers", () => {
  const users = GetAllUsers();
  console.log(users);
  io.emit("users", users);
});
server.listen(3001);
