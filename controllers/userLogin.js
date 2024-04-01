const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const { getConnection, runQueryValues, loginSyntax } = require('../model/dbPool')
const secret = "agrowize"
const Login = async (req, res) => {
    const credentials = {
        email: req.body.username,
        password: req.body.userpassword
    }
    console.log(credentials)
    const connection = await getConnection();
    try {
        const result =  runQueryValues(connection, loginSyntax, [credentials.email])
        result.then(rs=>{
          
        if (rs) {
            console.log(rs)
          const vFy =  bcrypt.compare(credentials.password,rs[0].password)
          if(vFy){
             const token = jwt.sign(credentials, secret)
          res.status(200).json({ message: rs, token })
          console.log(token) 
          }
        }
        else {
            res.status(403).json({ message: 'invalid Login Credentials' })
        }
          }).catch(err=>{
            console.log(err);  
          })
        // const result = await runQueryValues(connection, loginSyntax, [credentials.email])
        // if(result.length>0){
        //     const vFy =  await bcrypt.compare(credentials.password,result[0].password)
        //     if(vFy){
        //        const token = jwt.sign(credentials, secret)
        //     res.status(200).json({ message: result, token })
        //     console.log(token) 
        //     }else{
        //         res.status(403).json({ message: 'invalid Login Credentials' })
        //     }
        // }
        // else{
        //     res.status(403).json({ message: 'wrong email address' })
        // } 

    }
    catch (err) {
        console.log(err)
    }
}
module.exports = { Login }




            
      