const { getConnection, runQueryValues, resetSyntax} = require('../model/dbPool');
const bcrypt = require('bcryptjs');

// Endpoint for password reset
async function resetPassword(req, res){
  const { email, password, confirmPassword } = req.body;

  console.log(password, email)

  // Validate inputs
  try{
        if (password === "" || confirmPassword === "") {
            return res.status(412).json({ message: "Empty input fields!" });
        }else if(confirmPassword !== password) {
            return res.status(412).json({ message: "Passwords do not match" });
        }else if (password.length < 8 || confirmPassword.length < 8) {
            return res.status(412).json({ message: "Password must have at least 8 characters" });
    }
  }catch(err){
        console.log(err)
        return res.status(500).json({ error: 'An issue occured with password reset' });
    }

  // Hash the new password
  const hashedPassword = bcrypt.hashSync(password, 10);
const connection = await getConnection()
try {
      // Update password in the database
            const result = await runQueryValues(connection, resetSyntax, [hashedPassword, email]);
            // const result = await runQueryValues(connection, resetSyntax, [Credentials.password, Credentials.confirmPassword, Credentials.email]);
            
            if(result){
                // const storedEmail = result[0].email
            res.status(200).json({ message: result });
            console.log(result)
            }
        }catch (err) {
            console.error('Error resetting password:', err);
            res.status(500).json({ error: 'An error occurred while resetting password.' });
        } finally {
            connection.release(); // Release the connection after usage
        }
        }

//   connection.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email], (error, results) => {
//     if (error) {
//       console.error('Error updating password:', error);
//       return res.status(500).json({ error: 'An error occurred while updating password' });
//     }
//     console.log('Password updated successfully');
//     res.status(200).json({ message: 'Password updated successfully' , results});
//   });
// };

module.exports={resetPassword};




// const bcrypt = require('bcryptjs');
// const { getConnection, runQueryValues, resetSyntax } = require('../model/dbPool');

// async function resetPassword(req, res) {

//     const Credentials = {
//         email: req.body.username,
//         password: req.body.userpassword,
//         confirmPassword: req.body.confirmpassword
//     };
//     console.log(Credentials);
// try{
//     if (Credentials.password === "" || Credentials.confirmPassword === "") {
//         return res.status(412).json({ message: "Empty input fields!" });
//     }else if(Credentials.confirmPassword !== Credentials.password) {
//         return res.status(412).json({ message: "Passwords do not match" });
//     }else if (Credentials.password.length < 8 || Credentials.confirmPassword.length < 8) {
//         return res.status(412).json({ message: "Password must have at least 8 characters" });
// }
// console.log(Credentials.confirmPassword.length)
// }catch(err){
//     console.log(err)
//     return res.status(500).json({ error: 'An issue occured with password reset' });
// }
//     const connection = await getConnection();
//     try {
//         const result = await runQueryValues(connection, resetSyntax, [bcrypt.hashSync(Credentials.password), bcrypt.hashSync(Credentials.confirmPassword), Credentials.email]);
//         // const result = await runQueryValues(connection, resetSyntax, [Credentials.password, Credentials.confirmPassword, Credentials.email]);
        
//         if(result){
//             // const storedEmail = result[0].email
//         res.status(200).json({ message: result });
//         console.log(result)
//         }
//     }catch (err) {
//         console.error('Error resetting password:', err);
//         res.status(500).json({ error: 'An error occurred while resetting password.' });
//     } finally {
//         connection.release(); // Release the connection after usage
//     }
//     }

// module.exports = { resetPassword };