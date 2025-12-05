const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = express();

// middleware
app.use(express.static("public"));

const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  return res.send("index.html");
});

io.on("connection", (socket) => {
  console.log("A user Connected " + socket.id);
  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(3000, () => {
  console.log(`Server running at port:http://localhost:3000`);
});
