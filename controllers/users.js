const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const secret = "agrowize"
const users ={
    email : "tee@gmail.com",
    password :"$2a$10$Y.9DlejiLprJGpKFS9qZReh2i",
    
}
const home = async(req,res)=>{
res.status(200).json({message:"Success!"})
}

const about = async(req,res)=>{
    res.status(200).json({message: req.text})
    }
    
const Login = async(req,res)=>{
    //return login status
const token = jwt.sign(users,secret)
console.log(token)
//verify user_ date 

}
const details = async(req,res)=>{
    res.status(200).json({message:"message"})  
console.log("dfsdgsfs")
}
module.exports= {home,about,Login,details}