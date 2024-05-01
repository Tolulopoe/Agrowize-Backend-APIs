const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {v4: uuidv4  } = require('uuid');
const {
  getConnection,
  runQueryValues,
  loginSyntax,
  existingUser,
  sessionsSQL
} = require("../model/dbPool");
const secret = "agrowize";
const Login = async (req, res) => {
  const credentials = {
    email: req.body.username,
    password: req.body.userpassword,
  };

  try{
  if (credentials.username === "" || credentials.password === "") {
    return res.status(412).json({ message: "Empty input fields!" });
  }
}catch(err){
    console.log(err, 'Issue with credentials')
  }
// } else if (credentials.password.length < 8) {
//     return res.status(412).json({ message: "Password must have at least 8 characters" });
// } 
  const connection = await getConnection();
  try {
    const exists = await runQueryValues(connection, existingUser, [
      credentials.email,
    ]);
    if ((exists.length = 0)) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please sign up",
      });
    } 
    const result = await runQueryValues(connection, loginSyntax, [credentials.email])
    if (result.length > 0) {
      const vFy = await bcrypt.compare(credentials.password, result[0].password)
      // const vFy = await compare(credentials.password, result[0].password)
      console.log('vfy ', result[0].password)

      if (vFy) {
        const sessions_Id = uuidv4 ()
        // console.log(sessions_Id)
        const results = await runQueryValues(connection, sessionsSQL,[result[0].userid,sessions_Id])
        console.log(results)
        const token = jwt.sign({userId:result[0].userid, sessions_Id:sessions_Id}, secret)
        // console.log(token)
        res.status(200).json({ message: 'logged in successfully', token, sessions_Id })
        return;
        
      } else {
        res.status(403).json({ message: 'invalid Login Credentials' })
        return;
      }
    }
    else {
      res.status(403).json({ message: 'wrong email address' })
      return;
    }
  } catch (err) {
    console.log(err);
  }finally{
    connection.release()
  }
};
module.exports = { Login }



// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const { v4: uuidv4 } = require('uuid');
// const {
//   getConnection,
//   runQueryValues,
//   loginSyntax,
//   existingUser,
//   sessionsSQL
// } = require("../model/dbPool");
// const secret = "agrowize";

// const Login = async (req, res) => {
//   const credentials = {
//     email: req.body.username,
//     password: req.body.userpassword,
//   };
// console.log(credentials.email)
//   if (!credentials.email || !credentials.password) { 
//     return res.status(412).json({ message: "Empty input fields." });
//   }

//   const connection = await getConnection(); 
//   try {
//     // Check if user exists
//     const existingUsers = await runQueryValues(connection, existingUser, [credentials.email]);
//     if (existingUsers.length === 0) { 
//       connection.release(); 
//       return res.status(400).json({
//         success: false,
//         message: "Invalid login credentials.", // Avoid revealing if the user exists or not
//       });
//     }

//     // Verify user password
//     const result = await runQueryValues(connection, loginSyntax, [credentials.email]);
//     if (result.length > 0) {
//       const vFy = await bcrypt.compare(credentials.password, result[0].password);

//       if (vFy) {
//         const sessions_Id = uuidv4();
//         await runQueryValues(connection, sessionsSQL, [result[0].userid, sessions_Id]); // Create a new session
//         const token = jwt.sign({ userId: result[0].userid, sessions_Id: sessions_Id }, secret);

//         connection.release(); 
//         return res.status(200).json({ message: "Logged in successfully.", token }); 

//       } else {
//         connection.release(); 
//         return res.status(403).json({ message: "Invalid login credentials." });
//       }
//     } else {
//       connection.release(); 
//       return res.status(403).json({ message: "Invalid login credentials." }); // Avoid specific info
//     }

//   } catch (error) {
//     console.error("Error during login:", error);

//     if (!res.headersSent) { 
//       connection.release(); 
//       return res.status(500).json({ message: "An error occurred during login." });
//     }
//   }
// };

// module.exports = { Login };