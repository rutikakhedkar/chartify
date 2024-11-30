require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const registerRouter = require('./router/register_router');
const chatRouter = require('./router/chat_router');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// HTTP Server with Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chartify-zeta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("message", (msg) => {
    console.log("Message received:", msg);
    io.emit("messageSent", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/register', registerRouter);
app.use('/api/chat', chatRouter);

app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

// Start the Server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
