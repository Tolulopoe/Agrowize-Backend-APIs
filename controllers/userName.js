const { getConnection, runQueryValues, existingSignup, userNameSyntax } = require('../model/dbPool');
const {verifyAuth} = require('../middleware/auth')

async function userName(req, res) {
    const user_id = req.decoded.userId;
    
    console.log('req.decoded:', req.decoded.userId);

    if (!req.decoded || !req.decoded.userId) {
      return res.status(400).json({ success: false, message: 'Invalid or missing userId' });
  }
  
    const connection = await getConnection();
    const exists = await runQueryValues(connection, existingSignup, [user_id]);
  
    if (exists.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });
    }
  
    try {
      const result = await runQueryValues(connection, userNameSyntax, [user_id]);
      if (result) {
        res.status(200).json(result);
      } else {
        console.error('Error fetching userName:', error);
        res.status(500).json({ error: 'An error occurred while fetching username' });
      }
    } catch (err) {
      console.error('Error fetching userName:', err);
      res.status(500).json({ error: 'An error occurred while fetching user data' });
    } finally {
      connection.release();
    }
  }
  module.exports={userName}