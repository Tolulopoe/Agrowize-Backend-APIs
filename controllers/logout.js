const jwt = require('jsonwebtoken');
const tokenBlacklist = new Set();

async function logout(req, res) {
    const token = req.headers.authorization.split(' ')[1]; 
    tokenBlacklist.add(token);
    res.status(200).json({ message: 'Logout successful' });
}

function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    if (tokenBlacklist.has(token)) {
        return res.status(401).json({ message: 'Token is blacklisted, please log in again' });
    }
    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { logout, verifyToken };


// const { getConnection, runQueryValues} = require('../model/dbPool')
// const {Login} = require('../controllers/userLogin')
// async function logout(req, res) {
//     // Clear session/token (example)
//     req.session.destroy(token); 
   
    
//     res.status(200).json({ message: 'Logout successful' });
// }

// module.exports = { logout };