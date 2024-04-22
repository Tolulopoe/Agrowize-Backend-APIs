const {
    getConnection,
    runQueryValues,
    logoutSyntax,
  } = require("../model/dbPool");

  async function Logout(req,res){
    const sessions_Id= req.decoded.sessions_Id

const connection = await getConnection();

const loggedOut = await runQueryValues(connection, logoutSyntax,[sessions_Id])
if (loggedOut){
  res.send('logged out successfully')
}

  }
module.exports={Logout}











// const jwt = require("jsonwebtoken");
// const token = require('../middleware/auth')
// const {
//   getConnection,
//   runQueryValues,
//   logoutSyntax,
// } = require("../model/dbPool");
// const Logout = async (req, res) => {
//   const credentials = {
//     email: req.body.username,
//     userId: req.decoded
//   };
//   console.log(credentials)

//   const connection = await getConnection();
//   try {
//     const result = await runQueryValues(connection, logoutSyntax, [credentials.userId])
//     if (result) {
     
//                 res.status(200)
//                 res.clearCookie(token);
//                 res.status(200).json({message: 'logged out successfully'})
//                 console.log(result)
//       }
//   } catch (err) {
//     console.log(err);
//   }
// };
// module.exports = { Logout}


// // const { getConnection, runQueryValues,logoutSyntax} = require('../model/dbPool');
// // // const {auth} = require('../middleware/auth');

// // const Logout = async (req, res) => {

// //     const email = req.body.email;

// //     const connection = await getConnection();

// // try{
// //     const result = await runQueryValues(connection, logoutSyntax,[email])
// //     // Clear the JWT token from the client's browser by setting an empty token or removing it entirely
// //     if (result){
// //         res.status(200)
// //         res.clearCookie('token');
// //         res.status(200).json({message: 'logged out successfully'})
// //         console.log(result)
// //         // Assuming the token is stored in a cookie
// //     }else if(err)  {
// //     // Additionally, you might want to perform any cleanup actions here if necessary
    
// //     // Respond with a success message indicating that the user has been logged out
// //     res.status(200).json({ message: "Logged out successfully." });
// //     }
// //   }catch(err){
// //     console.log(err)
// //   }
// // }
// //   module.exports = { Logout };


// // const jwt = require('jsonwebtoken');
// // const tokenBlacklist = new Set();

// // async function logout(req, res) {
// //     const token = req.headers.authorization.split(' ')[1]; 
// //     tokenBlacklist.add(token);
// //     res.status(200).json({ message: 'Logout successful' });
// // }

// // function verifyToken(req, res, next) {
// //     const token = req.headers.authorization.split(' ')[1];
// //     if (tokenBlacklist.has(token)) {
// //         return res.status(401).json({ message: 'Token is blacklisted, please log in again' });
// //     }
// //     try {
// //         const decoded = jwt.verify(token, 'your-secret-key');
// //         req.userData = decoded;
// //         next();
// //     } catch (error) {
// //         return res.status(401).json({ message: 'Invalid token' });
// //     }
// // }

// // module.exports = { logout, verifyToken };


// // const { getConnection, runQueryValues} = require('../model/dbPool')
// // const {Login} = require('../controllers/userLogin')
// // async function logout(req, res) {
// //     // Clear session/token (example)
// //     req.session.destroy(token); 
   
    
// //     res.status(200).json({ message: 'Logout successful' });
// // }

// // module.exports = { logout };