const {getConnection,runQueryValues,existingUser} = require('../model/dbPool')
const mailSender = require('./mailer')
async function forgotPassword(req,res){
    const credential = {
        email: req.body.username
    }
    console.log(credential)
    const connection = await getConnection();
    try {
        // Function to generate OTP 
function generateOTP() { 
    
	// Declare a digits variable 
	// which stores all digits 
	let digits = '0123456789'; 
	let OTP = ''; 
	let len = digits.length 
	for (let i = 0; i < 6; i++) { 
		OTP += digits[Math.floor(Math.random() * len)]; 
	} 
	
	return OTP; 
} 
const sendOtp = generateOTP()
        const result =  runQueryValues(connection,existingUser,[credential.email])
        result.then(rs=>{ 
        if (rs) {
            mailSender(credential.email, "OTP", `Please use this code : ${sendOtp} to reset your password.`)
}
})
// res.render('/toVerifyOTP', {OTP:sendOtp})
    } 
    
catch(err){
    console.log(err)
    }   
} 
module.exports = {forgotPassword}