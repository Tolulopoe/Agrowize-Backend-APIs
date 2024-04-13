const { getConnection, runQueryValues, resendotpSyntax, existingUser } = require('../model/dbPool');
const mailSender = require('./mailer');
// const moment = require('moment-timezone');

function generatedOTP() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}
async function resendOTP(req, res) {
  const currentTimeStamp = Date.now();
  const expiryTimeStamp = currentTimeStamp + 10 * 60 * 1000; // 10 minutes in milliseconds
  // Convert the timestamps to human-readable format
  const currenttime = new Date(currentTimeStamp);
  const expiry_time = new Date(expiryTimeStamp);
  console.log(currenttime, expiry_time)
  
  const resenduserOtp = {
    email: req.body.username,
    otp: generatedOTP(),
    currentTime: currenttime,
    expiry_time: expiry_time // Expiry time: 10 minutes
  };
  console.log(req.body.username)
  console.log(resenduserOtp.email);
  console.log("expires", expiry_time);
  
  // Check if email is provided
  if (!resenduserOtp.email) {
    return res.status(412).json({ message: "Email is required." });
  }
  const connection = await getConnection();
  try {
    const exists = await runQueryValues(connection, existingUser, [
      resenduserOtp.email,
    ]);
    console.log("exists ", exists);
    if (exists.length === 0) {
      return res.status(400).json({
        success: false,
        message: "User does not exist.",
      });
    }  else if (exists.length > 0) {
      try{
      const result = await runQueryValues(connection, resendotpSyntax, [
        resenduserOtp.otp,
        resenduserOtp.currentTime,
        resenduserOtp.expiry_time,
        resenduserOtp.email
      ]);
      console.log(result);
      if (result) {
        mailSender(
          resenduserOtp.email,
          "OTP",
          `Your new OTP for password reset is: ${resenduserOtp.otp}. This OTP will expire in 10 minutes.`
        );
        return res.status(200).json({ message: 'OTP sent successfully.' });
      } else {
        return res.status(500).json({
          error: 'Failed to generate OTP. Please try again later.',
        });
      }
      }catch(err){
        console.log(err)
          }
    }
  } catch (err) {
    console.error('Error generating OTP:', err);
    return res.status(500).json({ error: 'An error occurred while generating OTP.' });
  } finally {
    connection.release(); // Release the connection after usage
  }
}
module.exports = { resendOTP };





// const { getConnection, runQueryValues, resendotpSyntax, existingUser } = require('../model/dbPool');
// const mailSender = require('./mailer');
// const moment = require('moment-timezone');

// function generateOTP() {
//     return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
//   }
  
// async function resendOTP(req, res) {
//     const currentTimeStamp = Date.now();
//     const expiryTimeStamp = currentTimeStamp + 10 * 60 * 1000; // 10 minutes in milliseconds
//   // Convert the timestamps to human-readable format
//   const currenttime = new Date(currentTimeStamp);
//   const expiry_time = new Date(expiryTimeStamp);
//   console.log(currenttime, expiry_time)
  
//   const resenduserOtp = {
//     email: req.body.username,
//     otp: generateOTP(),
//     currentTime: currenttime,
//     expiry_time: expiry_time // Expiry time: 10 minutes
//   }
//   console.log("expires", expiry_time);
  
//   // Check if email is provided
//   if (!resenduserOtp.email) {
//     return res.status(412).json({ message: "Email is required." });
//   }

//   const connection = await getConnection();

//   try {
//     const exists = await runQueryValues(connection, existingUser, [
//         resenduserOtp.email,
//     ]);
//     console.log("exists ", exists);
//     if ((exists.length == 0)) {
//       return res.status(400).json({
//         success: false,
//         message: "User does not exist",
//       });
//     } else if (exists.length > 0) {
//   const result = await runQueryValues(connection, resendotpSyntax, [resenduserOtp.email,resenduserOtp.otp, resenduserOtp.currentTime,resenduserOtp.expiry_time]);
// console.log(result)
//   if (result) {
//     mailSender(resenduserOtp.email, "OTP", `Your new OTP for password reset is: ${resenduserOtp.otp}. This OTP will expire in 10 minutes.`);
//     res.status(200).json({ message: 'OTP sent successfully.' });
//     console.log(resenduserOtp.otp)
// } 
// }else {
//       return res.status(500).json({ error: 'Failed to generate OTP. Please try again later.' });
//     }
//   } catch (err) {
//     console.error('Error generating OTP:', err);
//     return res.status(500).json({ error: 'An error occurred while generating OTP.' });
//   } finally {
//     connection.release(); // Release the connection after usage
//   }
// }

// module.exports = { resendOTP };