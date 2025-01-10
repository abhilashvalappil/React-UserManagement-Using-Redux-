const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup logic
const signup = async (req, res) => {
    console.log("signuppppppppppppppppppppp");
    
    console.log(req.body);
    const { username, email, password } = req.body;
    console.log("username, email, password",username, email, password);
    
    
    

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        console.log("newUser",newUser);
        
        
        await newUser.save();
        console.log("999999999999999999999999999999999");
        

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login logic
const login = async (req, res) => {
    console.log("3333333333333333333333333333", req.body);
    
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({user, token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    signup,
    login
}