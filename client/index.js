const express = require("express");
const app = express();

const server = require("http").createServer(app);
const socketio = require("socket.io");

app.get("/", (req, res) => {
  res.send("Welcome to a good starting");
});

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  console.log("connected successfully");
  client.on("event", (data) => {
    console.log(data);
    client.emit("event_response", data);
  });
  client.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(3001);
