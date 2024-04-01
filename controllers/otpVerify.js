
const sendOtp = require('./forgotPasSword')

async function toVerifyOTP(req, res) {
    const userOTP = {
        otp: req.body.OTP,
    }
    console.log(userOTP)
    console.log('sendOtp ', sendOtp )
    const otpVerify = userOTP.otp===sendOtp
    if(otpVerify){
    res.status(200).json({ message: "otp entered correctly" })
    console.log(otpVerify) 
    }else{
        res.status(404).json({ message: "Enter correct OTP" })  
    }
} 

module.exports = { toVerifyOTP}




// const mailSender = require('./mailer')
// const otpStore = {};
// const { storedOTP } = otpStore;
// async function toVerifyOTP(req, res) {
//     req.body.OTP
// }
//     console.log(req.body.OTP)
//     // Verify the OTP 
//     if (req.body.OTP === storedOTP) {
//         // OTP verification successful
//         res.json({ success: true, message: 'OTP verification successful!' });
//     } else if (req.body.OTP !== storedOTP){
//         // Invalid OTP or expired OTP
//         res.status(400).json({ success: false, message: 'Invalid OTP.' });
//     } 
//     else {
//         // email not found 
//         res.status(400).json({ success: false, message: 'email not found.' });
//     }
//     // const otpVerify = userOTP.otp===sendOtp
//     // if(otpVerify){
//     // res.status(200).json({ message: "otp entered correctly" })
//     // console.log(otpVerify) 
//     // }else{
//     //     res.status(404).json({ message: "Enter correct OTP" })  
//     // }

// module.exports = { toVerifyOTP }