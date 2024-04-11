const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  getConnection,
  runQueryValues,
  loginSyntax,
  existingUser,
} = require("../model/dbPool");
const secret = "agrowize";
const Login = async (req, res) => {
  const credentials = {
    email: req.body.username,
    password: req.body.userpassword,
  };
  console.log(credentials)
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
    console.log("exists ", exists);
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
      console.log('vfy ', result[0].password)

      if (vFy) {
        const token = jwt.sign(credentials, secret)
        res.status(200).json({ message: result, token })
        console.log(token)
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