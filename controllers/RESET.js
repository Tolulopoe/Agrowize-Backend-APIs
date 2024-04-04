const bcrypt = require('bcryptjs');
const { getConnection, runQueryValues, resetSyntax } = require('../model/dbPool');

async function resetPassword(req, res) {
    console.log(req.body)
    const Credentials = {
        email: req.body.email,
        password: req.body.userpassword,
        newpassword: req.body.confirmpassword
    };
    console.log(Credentials);
try{
    if (Credentials.password === "" || Credentials.newpassword === "") {
        return res.status(412).json({ message: "Empty input fields!" });
    } else if (Credentials.password.length < 8 || Credentials.newpassword.length < 8) {
        return res.status(412).json({ message: "Password must have at least 8 characters" });
    }else if(Credentials.newpassword !== Credentials.password) {
        return res.status(412).json({ message: "Passwords do not match" });
    }
}catch(err){
    console.log(err)
    return res.status(500).json({ error: 'An issue occured with password reset' });
}
    const connection = await getConnection();
    try {
        const result = await runQueryValues(connection, resetSyntax, [Credentials.email, bcrypt.hashSync(Credentials.newpassword)]);
        if(result){
            // const storedEmail = result[0].email
        res.status(200).json({ message: result });
        }
    }catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ error: 'An error occurred while resetting password.' });
    } finally {
        connection.release(); // Release the connection after usage
    }
    }


module.exports = { resetPassword };


// const bcrypt = require('bcryptjs')
// const { getConnection, runQueryValues, resetSyntax,selectQuery } = require('../model/dbPool')
// async function resetPassword(req, res) {
//     const Credentials = {
//         password: req.body.userpassword,
//         newpassword: req.body.confirmpassword
//     }
//     console.log(Credentials)
//     if (Credentials.password == "" || Credentials.newpassword == "") {
//         res.json({
//             status: 412,
//             message: "Empty input fields!"
//         })
//     } else if (Credentials.password.length < 8 || Credentials.newpassword.length < 8) {
//         res.json({
//             status: "FAILED",
//             message: "Password must have at least 8 characters"
//         })
//     } else if (Credentials.newpassword != Credentials.password) {
//         res.json({
//             status: "FAILED",
//             message: "Passwords do not match"
//         })
//     }

//     const connection = await getConnection();
//     try {
//         const result = await runQueryValues(connection, selectQuery, resetSyntax, [bcrypt.hashSync(Credentials.password), bcrypt.hashSync(Credentials.newpassword)])
//         res.status(200).json({ message: result })
//     }
//     catch (err) {
//         console.log(err)
//     }
// }

// module.exports = { resetPassword }