
const bcrypt = require('bcryptjs')
const { getConnection, runQueryValues, signupSyntax, existingUser } = require('../model/dbPool')
async function signup (req, res) {
    // const currentDateTime = new Date();
    // const createdAt = currentDateTime.toISOString();

    const credentials = {
        fullName: req.body.fullname,
        email: req.body.username,
        password: req.body.userpassword,
        confirmPassword: /*bcrypt.hashSync*/req.body.confirmpassword,
        // create_time: createdAt
    }
   console.log(req.body.fullname,req.body.username)
    if (credentials.fullName == "" || credentials.email == "" || credentials.password == "" || credentials.confirmPassword == "") {
        res.json({
            status: 412,
            message: "Empty input fields!"
        })
    } else if (!/^[a-zA-Z ]*$/.test(credentials.fullName)) {
        res.json({
            status: 412,
            message: "Invalid Full Names!"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(credentials.email)) {
        res.json({
            status: 412,
            message: "Invalid email entered"
        })
    
}else if (credentials.password.length < 8) {
        res.json({
            status: "FAILED",
            message: "Password must have at least 8 characters"
        })
    } else if (credentials.confirmPassword.length < 8 || credentials.confirmPassword != credentials.password) {
        res.json({
            status: "FAILED",
            message: "Passwords do not match"
        })
    }
    console.log(credentials)

    const connection = await getConnection();
    try {

        //check if user already exists
        const exists = await runQueryValues(connection, existingUser, [credentials.email])
        console.log('exists ', exists)
        if (exists.length>0) {
            return res.status(400).json({
                success: false,
                message: "User already exists, please login instead"
            })
        } 
        console.log(credentials)
        const result = await runQueryValues(connection, signupSyntax, [credentials.fullName, credentials.email, bcrypt.hashSync(credentials.password), bcrypt.hashSync(credentials.confirmPassword)])
        res.status(200).json({ message: result })

    }
    catch (err) {
        console.log(err)
    }

    connection.release()
}

module.exports = { signup }