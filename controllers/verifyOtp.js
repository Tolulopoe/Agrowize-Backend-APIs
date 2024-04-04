const {getConnection,runQueryValues,selectQuery } = require('../model/dbPool')
const moment = require('moment-timezone');
// Endpoint for OTP verification

async function verifyOtp(req, res){
    const otp = req.body.otp
    console.log(otp)
    const currentTimeStamp = Date.now();
// Convert the timestamps to human-readable format
const currentTime = new Date(currentTimeStamp);
// console.log(currentTime)
    const connection = await getConnection();
    
    if (otp === "") {
        return res.status(412).json({ message: "Empty input fields!" });
    } else if ( otp.length !==6) {
        return res.status(412).json({ message: "OTP must have 6 characters" });
    } 

    try{
    const result = await runQueryValues(connection,selectQuery, [otp]);
    console.log(result)
        if (result) {
            
            try {
                const storedOTP = result[0].otp;
                const storedEmail = result[0].email;
                const expire = result[0].expiry_time;

                if (storedOTP && expire && otp === storedOTP && expire > currentTime) {
                    console.log(currentTime);
                    return res.status(200).json({ message: 'OTP verified successfully', email: storedEmail, expires: expire });
                } else {
                    return res.status(404).json({ error: 'Invalid or expired OTP' });
                }
            } catch (err) {
                console.log(err);
                return res.status(500).json({ error: 'Invalid or expired OTP' });
            }
            // console.log(expire)
            // console.log(result[0].otp)
// console.log(result)
            // Compare the stored OTP with the provided OTP
        //     console.log(otp)
        //       const rs=  ( otp=== storedOTP && expire > currentTime)
        //       if (rs){
        //         console.log(currentTime)   
        //         res.status(200).json({ message: 'OTP verified successfully' ,email: Semail, expires: expire});
        //     }
        // //     else if ( otp != storedOTP || expire < currentTime) {
        // //         res.status(200).json({ error: 'Invalid or expired OTP' });
        // // }
        console.log(otp)
    //     }else if (rs.length==0) {
    //         res.status(404).json({ error: 'Invalid or expired OTP' });
    // }
}
    }
catch (err) {
    console.log(err, " 'Invalid or expired OTP'");
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