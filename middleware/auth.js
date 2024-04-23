const jwt = require('jsonwebtoken');
const {getConnection,runQueryValues, findSessionsSQL} = require('../model/dbPool');
const { run } = require('jest');
const verifyAuth = async(req,res,next)=>{
const bearer = req.headers["authorization"]
if(typeof bearer == "undefined"){
    res.status(403).json({message:"unauthorised user"})
}else{
    try{
const fullbearer = bearer.split(' ');
req.webToken = fullbearer[1];
req.decoded = jwt.verify(fullbearer[1],"agrowize")
console.log(req.decoded)

const connection = await getConnection();
const sessionsVerify = await runQueryValues(connection, findSessionsSQL,[req.decoded.userId, req.decoded.sessions_Id])
if (sessionsVerify.length==0){
    res.status(403).json({message:"user has been logged out"})
}
    }catch( err){
        res.status(403).json({message:"invalid token"})
    }
}
console.log(bearer)
next()
}


module.exports ={verifyAuth}