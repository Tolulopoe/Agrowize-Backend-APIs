const bcrypt = require('bcryptjs');
const { getConnection, runQueryValues, resetSyntax } = require('../model/dbPool');

async function resetPassword(req, res) {

    const Credentials = {
        email: req.body.username,
        password: req.body.userpassword,
        confirmPassword: req.body.confirmpassword
    };
    console.log(Credentials);
try{
    if (Credentials.password === "" || Credentials.confirmPassword === "") {
        return res.status(412).json({ message: "Empty input fields!" });
    } else if (Credentials.password.length < 8 || Credentials.confirmPassword.length < 8) {
        return res.status(412).json({ message: "Password must have at least 8 characters" });
    }else if(Credentials.confirmPassword !== Credentials.password) {
        return res.status(412).json({ message: "Passwords do not match" });
    }
}catch(err){
    console.log(err)
    return res.status(500).json({ error: 'An issue occured with password reset' });
}
    const connection = await getConnection();
    try {
        const result = await runQueryValues(connection, resetSyntax, [bcrypt.hashSync(Credentials.password), bcrypt.hashSync(Credentials.confirmPassword), Credentials.email]);
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

module.exports = { resetPassword };


