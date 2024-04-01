const { getConnection, runQueryValues,selectQuery } = require('../model/dbPool');

// Verify OTP API
async function verifyOtp(req, res) {
    const email = req.body.email;
    const otp = req.body.otp;

    const connection = await getConnection();

    try {
        // Execute the query
        const result = await runQueryValues(connection, selectQuery, [email, otp]);

        if (result.length > 0) {
            // Valid OTP
            res.status(200).json({ message: 'OTP verified successfully.' });
        } else {
            // Invalid OTP or expired
            res.status(400).json({ error: 'Invalid or expired OTP.' });
        }
    } catch (err) {
        console.error('Error verifying OTP:', err);
        res.status(500).json({ error: 'An error occurred while verifying OTP.' });
    } finally {
        connection.release(); // Release the connection after usage
    }
}

module.exports = { verifyOtp };


// // Verify OTP API
// function verifyOtp(req, res){
//     //const email = req.body.email;
//     const otp = req.body.otp;
// }
//     const connection = await getConnection();
//     try {
//         const result =  runQueryValues(connection,selectQuery,[email,otp])
//             result.then(rs=>{
//                 if (err) {
//                 console.error('Error verifying OTP:', err);
//                 return res.status(500).json({ error: 'An error occurred while verifying OTP.' });
//               }
//               if (result.length > 0) {
//                 // Valid OTP
//                 res.status(200).json({ message: 'OTP verified successfully.' });
//               } else {
//                 // Invalid OTP or expired
//                 res.status(400).json({ error: 'Invalid or expired OTP.' });
//               }
//             })
//           }catch(err){
//             console.log(err)
//             }  

// module.exports={verifyOtp}      