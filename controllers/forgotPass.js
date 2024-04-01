const { getConnection, runQueryValues, otpSyntax } = require('../model/dbPool');
const mailSender = require('./mailer');

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

async function forgotPass(req, res) {
  const currentTime = new Date().getTime();
  const expires = new Date(currentTime + 6 * 60 * 1000); // Expiry time: 6 minutes

  const userOtp = {
    email: req.body.username,
    otp: generateOTP(),
    expires: expires // Expiry time: 6 minutes
  };

  console.log("expires", expires);

  const connection = await getConnection();
  
  try {
    const result = await runQueryValues(connection, otpSyntax, [userOtp.email, userOtp.otp, userOtp.expires]);

    if (result) {
      mailSender(userOtp.email, "OTP", `Your OTP for password reset is: ${userOtp.otp}. This OTP will expire in 6 minutes.`);
      res.status(200).json({ message: 'OTP sent successfully.' });
    } else {
      console.error('Error storing OTP:', err);
      res.status(500).json({ error: 'An error occurred while storing OTP.' });
    }
  } catch (err) {
    console.error('Error storing OTP:', err);
    res.status(500).json({ error: 'An error occurred while storing OTP.' });
  } finally {
    connection.release(); // Release the connection after usage
  }
}

module.exports = { forgotPass };


//const { getConnection, runQueryValues, /*existingUser,*/ otpSyntax } = require('../model/dbPool')
// const mailSender = require('./mailer')
// function generateOTP() {
//   return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
// }
// const currentTime = new Date().getTime();
// const expires = new Date(currentTime + 6 * 60 * 1000); // Expiry time: 6 minutes
// // console.log("expires", expires)
// async function forgotPass(req, res) {
//   const userOtp ={
//      email:req.body.username,
//      otp: generateOTP(),
//      expires : new Date(currentTime + 6 * 60 * 1000) // Expiry time: 6 minutes
//   }
//   console.log("expires", expires)
//       const connection = await getConnection();
//       try{
//         const result = await runQueryValues(connection, /*existingUser,*/ otpSyntax[userOtp.email, userOtp.otp, userOtp.expiry_time])
//         result.then(rs => {
//           if (rs) {
//             mailSender(credential.email, "OTP", `Your OTP for password reset is: ${otp}. This OTP will expire in 6 minutes.`)
//           } else if (err) {
//             console.error('Error storing OTP:', err);
//           }
//         });
//       }catch (err) {
//         console.log(err)
//       }  
          
//   } 
  

// module.exports = { forgotPass }
