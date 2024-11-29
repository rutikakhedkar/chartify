require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const registerRouter = require('./router/register_router');
const chatRouter=require('./router/chat_router')
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");



const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// cors
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chartify-3kq9pdojp-rutikakhedkars-projects.vercel.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for events from the client
  socket.on("message", (msg) => {
    console.log("Message received:", msg);

    // Broadcast the message to all clients
    io.emit("messageSent", msg);
  });

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Routes
// router
app.use('/api/register', registerRouter);
app.use('/api/chat',chatRouter)

app.get('/', (req, res) => {
    res.send('Hello, MongoDB!');
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
