const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express(); // Tạo instance của express
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const port = 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

app.use(express.static(path.join(__dirname)));

let plateNumber = null;

// Route để phục vụ file HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/show/:number/:status", (req, res) => {
  const plateNumber = req.params.number;
  const status = req.params.status; // 0: xanh, 1: đỏ

  io.emit("showPlate", {
    number: plateNumber,
    status: status,
  });

  setTimeout(() => {
    io.emit("hidePlate");
  }, 3000);

  res.json({ success: true });
});

http.listen(port, () => {
  console.log("Server running on port 3000");
});
