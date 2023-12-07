const bcrypt = require('bcryptjs');
const jwtUtil = require('../authUtil'); // Update the path accordingly
const User = require('../models/User');

const authController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await User.findOne({ username });
  
      // If the user doesn't exist or the password is incorrect, return an error
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwtUtil.generateToken(user._id);
  
      // Send the token as a response
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}
};

module.exports = authController;
