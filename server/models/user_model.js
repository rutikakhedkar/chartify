const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:
    {
        type: String, 
        required: true, 
        default: null
    },
    email:
     { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: 
    { 
        type: String, 
        default: null,
        required:true
     },
     intrests:
     [
      {
         type: Array, 
         default: [],
      }
     ],
     mood:
     {
        type: String, 
        default: null
     }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
