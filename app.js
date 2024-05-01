const express = require('express');
const app = express();
const cors = require('cors');
// const ejs = require('ejs');
const bodyParser = require('body-parser');
const { router } = require('./routes/rts');
app.use(cors());
// Allowing requests from localhost:3000
app.use(cors({ origin: 'http://localhost:3000'}))

const corsOptions = {
    origin: ['https://agrowize.vercel.app', 'http://localhost:3000'],// The allowed origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // HTTP methods to allow
    allowedHeaders: ['Content-Type','Content-Length','Host','User-Agent','Accept','Accept-Encoding','Authorization'], // Headers to allow
  };
  
  app.use(cors(corsOptions));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use((req,res,next)=>{
res.locals.username ="myUsername";
    next()
})
const sendOtp = ""

//EJS
// app.set('view engine', 'ejs');

// //Public Folder
// app.use(express.static('./public'));

// app.get('/', (req,res)=>res.render('index'))

app.use('/',router);

app.listen(6001,function(){
    console.log("Server Running on port 6001")
})


 