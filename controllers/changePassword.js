const bcrypt = require('bcryptjs')
const { getConnection, runQueryValues,resetSyntax} = require('../model/dbPool')
async function passwordChange(req, res) {
    const newCredentials = {
         password: req.body.userpassword,
         newPassword: req.body.newuserpassword,
        confirmPassword:req.body.confirmpassword,
    }
    console.log(newCredentials)
    if (newCredentials.password =="" || newCredentials.newPassword == "" || newCredentials.confirmPassword == "") {
        res.json({
            status: 412,
            message: "Empty input fields!"
        })
    } else if (newCredentials.password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password must have at least 8 characters"
        })
    } else if (newCredentials.confirmPassword != newCredentials.newPassword) {
        res.json({
            status: "FAILED",
            message: "Passwords do not match"
        })
    }
    
    const connection = await getConnection();
    try {

        const result = await runQueryValues(connection, resetSyntax, [bcrypt.hashSync(newCredentials.newPassword), bcrypt.hashSync(newCredentials.confirmPassword)])
        res.status(200).json({ message: result })
    }
    catch (err) {
        console.log(err)
    }

    connection.release()
}

module.exports = { passwordChange }