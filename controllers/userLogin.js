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

console.log(credentials.password)
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
    } else if (exists.length > 0) {
      return res.status(200).json({
        success: true,
        message: "logged in successfully",
      });
    }
    const result = await runQueryValues(connection, loginSyntax, [credentials.email])
    if (result.length > 0) {
      const vFy = await bcrypt.compare(credentials.password, result[0].password)
      // const vFy = await compare(credentials.password, result[0].password)
      console.log('vfy ', result[0].password)
// if (credentials.password === result[0].password){
//   vFy=true
// }
      if (vFy) {
        const sessions_Id = uuidv4 ()
        console.log(sessions_Id)
        const results = await runQueryValues(connection, sessionsSQL,[result[0].userid,sessions_Id])
        console.log(results)
        const token = jwt.sign({userId:result[0].userid, sessions_Id:sessions_Id}, secret)
        console.log(token)
        res.status(200).json({ message: results, token })
        
      } else {
        res.status(403).json({ message: 'invalid Login Credentials' })
      }
    }
    else {
      res.status(403).json({ message: 'wrong email address' })
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { Login }