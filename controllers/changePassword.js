const { getConnection, runQueryValues, resetSyntax } = require('../model/dbPool');
const bcrypt = require('bcryptjs');

async function passwordChange(req, res) {
    const { email, password, newPassword, confirmPassword } = req.body;

    // Input validation
    if (!email || !newPassword || !confirmPassword) {
        return res.status(412).json({ message: "Empty input fields!" });
    } else if (newPassword !== confirmPassword) {
        return res.status(412).json({ message: "Passwords do not match." });
    } else if (newPassword.length < 8) {
        return res.status(412).json({ message: "Password must be at least 8 characters long." });
    }

    const connection = await getConnection();

    try {
        // Hash the new password
        const hashedPassword = bcrypt.hashSync(newPassword, 10);

        // Update password in the database
        const result = await runQueryValues(connection, resetSyntax, [hashedPassword, email]);

        if (result.affectedRows > 0) { // Check if any rows were updated
            res.status(200).json({ message: "Password updated successfully." });
            console.log(result)
        } else {
            res.status(404).json({ message: "Email not found. Password not updated." });
        }
    } catch (err) {
        console.error("Error changing password:", err);
        res.status(500).json({ message: "An error occurred while changing password." });
    } finally {
        connection.release(); // Ensure the connection is released
    }
}

module.exports = { passwordChange };

//   const { email, password, newPassword, confirmPassword} = req.body;

//   // Validate inputs
//   try{
//         if (newPassword === "" || confirmPassword === "") {
//             return res.status(412).json({ message: "Empty input fields!" });
//         }else if(confirmPassword !== newPassword) {
//             return res.status(412).json({ message: "Passwords do not match" });
//     //     }else if (newPassword.length < 8 || confirmPassword.length < 8) {
//     //         return res.status(412).json({ message: "Password must have at least 8 characters" });
//     // }
//   }
// }catch(err){
//         console.log(err)
//         return res.status(500).json({ error: 'An issue occured with password reset' });
//     }

//   // Hash the new password
//   const hashedPassword = bcrypt.hashSync(newPassword, 10);
// const connection = await getConnection()
// try {
//       // Update password in the database
//             const result = await runQueryValues(connection, resetSyntax, [hashedPassword, email]);
//             // const result = await runQueryValues(connection, resetSyntax, [Credentials.password, Credentials.confirmPassword, Credentials.email]);
            
//             if(result){
//                 // const storedEmail = result[0].email
//             res.status(200).json({ message: result });
//             console.log(result)
//             }
//         }catch (err) {
//             console.error('Error resetting password:', err);
//             res.status(500).json({ error: 'An error occurred while resetting password.' });
//         } finally {
//             connection.release(); 
//         }
//         }

    



// const bcrypt = require('bcryptjs')
// const { getConnection, runQueryValues,resetSyntax} = require('../model/dbPool')
// async function passwordChange(req, res) {
//     const newCredentials = {
//          email: req.body.username,
//          password: req.body.userpassword,
//          newPassword: req.body.newuserpassword,
//         confirmPassword:req.body.confirmpassword,
//     }
//     console.log(newCredentials)
//     if (newCredentials.password =="" || newCredentials.newPassword == "" || newCredentials.confirmPassword == "") {
//         res.json({
//             status: 412,
//             message: "Empty input fields!"
//         })
//     } else if (newCredentials.password.length < 8) {
//         res.json({
//             status: "FAILED",
//             message: "Password must have at least 8 characters"
//         })
//     } else if (newCredentials.confirmPassword != newCredentials.newPassword) {
//         res.json({
//             status: "FAILED",
//             message: "Passwords do not match"
//         })
//     }
    
//     const connection = await getConnection();
//     try {

//         const result = await runQueryValues(connection, resetSyntax, [bcrypt.hashSync(newCredentials.newPassword), bcrypt.hashSync(newCredentials.confirmPassword),password])
//         res.status(200).json({ message: result })
//     }
//     catch (err) {
//         console.log(err)
//     }

//     connection.release()
// }

