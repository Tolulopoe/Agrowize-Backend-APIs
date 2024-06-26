const { getConnection, runQueryValues, otpSyntax,existingUser } = require('../model/dbPool');
const mailSender = require('./mailer');
const moment = require('moment-timezone')

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

async function forgotPass(req, res) {
  const currentTimeStamp = Date.now();
  const expiryTimeStamp = currentTimeStamp + 10 * 60 * 1000; // 10 minutes in milliseconds
// Convert the timestamps to human-readable format
const currenttime = new Date(currentTimeStamp);
const expiry_time = new Date(expiryTimeStamp);
console.log(currenttime, expiry_time)

const userOtp = {
  email: req.body.username,
  otp: generateOTP(),
  currentTime: currenttime,
  expiry_time: expiry_time // Expiry time: 6 minutes
}
console.log("expires", expiry_time);
if (userOtp.email === "" || userOtp.otp === "") {
  return res.status(412).json({ message: "Empty input fields!" });
} 
const connection = await getConnection();
  
  try {
      const exists = await runQueryValues(connection, existingUser, [
        userOtp.email,
      ]);
      console.log("exists ", exists);
      if ((exists.length == 0)) {
        return res.status(400).json({
          success: false,
          message: "User does not exist",
        });
      } else if (exists.length > 0) {
    const result = await runQueryValues(connection, otpSyntax, [userOtp.email, userOtp.otp, userOtp.currentTime,userOtp.expiry_time]);
console.log(result)
    if (result) {
      mailSender(userOtp.email, "OTP", `Your OTP for password reset is: ${userOtp.otp}. This OTP will expire in 10 minutes.`);
      res.status(200).json({ message: 'OTP sent successfully.' });
      console.log(userOtp.o)
  } 
}
}catch (err) {
  console.error('Error storing OTP:', err);
  // res.status(500).json({ error: 'An error occurred while storing OTP.' });
} finally {
  connection.release(); // Release the connection after usage
}
}
module.exports = { forgotPass };


