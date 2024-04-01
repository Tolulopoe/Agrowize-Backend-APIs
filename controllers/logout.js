const { getConnection, runQueryValues, loginSyntax } = require('../model/dbPool')
const {Login} = require('../controllers/userLogin')
async function logout(req, res) {
    // Clear session/token (example)
    req.session.destroy(token); 
   
    
    res.status(200).json({ message: 'Logout successful' });
}

module.exports = { logout };