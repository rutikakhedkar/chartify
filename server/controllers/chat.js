const Chat = require('../models/chat_model');
const multer = require("multer");
const path = require("path");
const fs = require("fs");
// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the directory where uploaded files will be saved
    cb(null, "./public/attchments");
  },
  filename: (req, file, cb) => {
    // Define the filename format for uploaded files
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.originalname}`);
  },
});

// Initialize Multer with storage settings
const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Set file size limit to 20MB
  fileFilter: (req, file, cb) => {
    // Accept only certain file types
    const fileTypes = /jpeg|jpg|png|ppt|pptx|pdf|docx|doc|xls|xlsx/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only jpegs,jpg, png, docx,xls ,ppts files are allowed."
        )
      );
    }
  },
});

const createChat = async (req, res) => {
  try {
    if (req.attachment) {
      console.log(req.attachment);
    }

    const { sender, newMessage, sticker } = req.body;

    if (!sender || typeof sender !== "string") {
      console.error("Invalid sender field:", sender);
      return res.status(400).json({ message: "Invalid or missing sender field" });
    }

    const chat = await Chat.create({
      sender: sender,
      message: newMessage,
      sticker: sticker,
      attachment: req.attachment ? req.attachment.filename : null,
    });
     
    res.status(201).json({ message: "Message added successfully", chat });
    socket.emit("message", chat);
  } catch (error) {
    console.error("Error creating chat message:", error);
    res.status(500).json({ message: "Server error", error });
  }
};



// Get all users
const getAllMessages = async (req, res) => {
  try {
    const chat = await Chat.find();
    res.status(200).json({message: chat});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports={createChat,getAllMessages,upload}