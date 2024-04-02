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
      return res.status(400).json({
        success: false,
        message: "logged in successfully",
      });
    }
    const result = await runQueryValues(connection, loginSyntax, [credentials.email])
    if (result.length > 0) {
      const vFy = await bcrypt.compare(credentials.password, result[0].password)
      console.log('vfy ', result[0].password)
      console.log("hashed: ",bcrypt.compare(credentials.password, rs[0].password))

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
module.exports = { Login };

// const result = runQueryValues(connection, loginSyntax, [credentials.email]);
    // result
    //   .then((rs) => {
    //     if (rs) {
    //       console.log(rs);
    //       bcrypt.compare(
    //         credentials.password,
    //         rs[0].password,
    //         (err, isMatch) => {
    //           console.log(
    //             "hashed: ",
    //             bcrypt.compare(credentials.password, rs[0].password)
    //           );
    //           if (isMatch) {
    //             const token = jwt.sign(credentials, secret);
    //             res.status(200).json({ message: rs, token });
    //             console.log(token);
    //           }
    //         }
    //       );
    //     } else if (err) {
    //       res.status(403).json({ message: "invalid Login Credentials" });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });