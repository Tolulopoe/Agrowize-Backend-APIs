
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const {router} = require('./routes/rts')
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next)=>{
res.locals.username ="myUsername";
    next()
})
const sendOtp = ""

app.use('/',router);
app.listen(6001,function(){
    console.log("Server Running on port 6001")
})