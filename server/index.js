require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const registerRouter = require('./router/register_router');
const chatRouter=require('./router/chat_router')
const cors = require("cors");


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://chartify-zeta.vercel.app', // Add allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Include all necessary methods
    credentials: true // Allow credentials like cookies
}));



// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

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
