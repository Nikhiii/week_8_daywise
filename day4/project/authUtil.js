const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const secretKey = 'nodesecret'; // Replace this with your actual secret key
  return jwt.sign({ userId }, secretKey, {
    expiresIn: '1h', // You can adjust the expiration time as needed
  });
};

const verifyToken = (token) => {
  try {
    const secretKey = 'nodesecret'; // Replace this with your actual secret key
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null; // Token is not valid
  }
};

module.exports = { generateToken, verifyToken };
