const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   sender:
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    message:
    {
        type: String, 
        default: null,
    },
    attachment: 
    { 
        type: String, 
        default: null,
     },
     sticker:
     {
        type: String, 
        default: null,
     },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
