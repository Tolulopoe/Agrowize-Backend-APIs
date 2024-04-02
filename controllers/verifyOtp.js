const {getConnection,runQueryValues,selectQuery } = require('../model/dbPool')
// Endpoint for OTP verification
async function verifyOtp(req, res){
    const otp = req.body.otp
console.log(otp)
    // Execute the query
    const connection = await getConnection();
    try{
    const rs = runQueryValues(connection,selectQuery, [otp]);
    rs.then((result)=>{
        if (result) {
            const storedOTP = result[0].otp;
            const Semail = result[0].email;
            const expiry_time = result[0].expiry_time;
console.log(result)
            // Compare the stored OTP with the provided OTP
            if ( otp=== storedOTP && expiry_time > new Date() ){
                res.status(200).json({ message: 'OTP verified successfully' ,email: Semail,expires_at: expiry_time});
            }
        }else if (result.length === 0) {
            res.status(404).json({ error: 'Invalid or expired OTP' });
        // }else if (error){
        //         console.error('Error fetching OTP:', error);
        //     res.status(500).json({ error: 'An error occurred while verifying OTP' });
        // } 
    }
})
    }catch (err) {
        console.log(err);
      }finally {
         connection.release();
    }
}
module.exports={verifyOtp}




// const { getConnection, runQueryValues,selectQuery } = require('../model/dbPool');

// // Verify OTP API
// async function verifyOtp(req, res) {
//     const email = req.body.email;
//     const otp = req.body.otp;

//     const connection = await getConnection();

//     try {
//         // Execute the query
//         const result = await runQueryValues(connection, selectQuery, [email, otp]);
// console.log( 'result',result)
//         if (result.length > 0) {
//             // Valid OTP
//             res.status(200).json({ message: 'OTP verified successfully.' });
//         } else {
//             // Invalid OTP or expired
//             res.status(400).json({ error: 'Invalid or expired OTP.' });
//         }
//     } catch (err) {
//         console.error('Error verifying OTP:', err);
//         res.status(500).json({ error: 'An error occurred while verifying OTP.' });
//     } finally {
//         connection.release(); // Release the connection after usage
//     }
// }

// module.exports = { verifyOtp };


// // // Verify OTP API
// // function verifyOtp(req, res){
// //     //const email = req.body.email;
// //     const otp = req.body.otp;
// // }
// //     const connection = await getConnection();
// //     try {
// //         const result =  runQueryValues(connection,selectQuery,[email,otp])
// //             result.then(rs=>{
// //                 if (err) {
// //                 console.error('Error verifying OTP:', err);
// //                 return res.status(500).json({ error: 'An error occurred while verifying OTP.' });
// //               }
// //               if (result.length > 0) {
// //                 // Valid OTP
// //                 res.status(200).json({ message: 'OTP verified successfully.' });
// //               } else {
// //                 // Invalid OTP or expired
// //                 res.status(400).json({ error: 'Invalid or expired OTP.' });
// //               }
// //             })
// //           }catch(err){
// //             console.log(err)
// //             }  