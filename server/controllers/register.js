const User = require('../models/user_model');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password,interests,mood } = req.body;
    console.log(username, email, password,interests,mood )
 
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    

    const sanitizedInterests = Array.isArray(interests)
    ? interests.map((item) => item.trim())
    : [];

    // Create and save new user
    const user = await User.create({ username, email, password, interests:sanitizedInterests  ,mood });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({message: users});
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// userlogin
const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message : 'User not found.' });
        }

        // Validate password
        if (user.password !== password) {
            return res.status(400).json({ message : 'Invalid credentials.' });
        }

        // Respond with success and user details
        res.status(200).json({
            message: 'Login successful.',
            user: {user},
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message : 'Internal server error.' });
    }
};



module.exports ={createUser,getAllUsers,userLogin}