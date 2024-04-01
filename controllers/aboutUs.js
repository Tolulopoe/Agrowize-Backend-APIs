const {getConnection,runQueryValues,aboutusSyntax} = require('../model/dbPool')
async function contact(req,res){
    const currentDateTime = new Date();
    const createdAt = currentDateTime.toISOString();
    const credentials = {
        fullNames: req.body.fullname,
        userName: req.body.username,
        Message: req.body.message,
        create_time: createdAt
    }
    console.log(credentials)
    const connection = await getConnection();
   try{
   const result =  await runQueryValues(connection ,aboutusSyntax,[credentials.fullNames,credentials.userName,credentials.Message,credentials.create_time])
res.status(200).json({message:result})
   }
   catch(err){
   console.log(err)
   }   
   }

module.exports = {contact}