const mysql = require('mysql2')
// const pool = mysql.createPool(
//     {connectionLimit:10,
//         host:"localhost",
//         password:"",
//         user:"root",
//         database:"agrowize"
//     })
    const pool = mysql.createPool(
        {connectionLimit:10,
            host:"bad1gmrjzdocbzwtw8hc-mysql.services.clever-cloud.com",
            password:"Nxso4gYxEVdfI03ijuku",
            user:"utqzsoda1xmmcywg",
            database:"bad1gmrjzdocbzwtw8hc"
        })
function getConnection(){
    return new Promise((resolve,reject)=>{
pool.getConnection((err,connection)=>{
    if(err)
    {reject(err)}
    else
    {
        resolve(connection)
    }
})
    })
}
function runQueryValues(conn,sqlQuery,values){
   return new Promise((resolve,reject)=>{
conn.query(sqlQuery,values,(err,result)=>{
    if(err){
        reject(err)
    }
    else{
        resolve(result)
    }
})
   })
}

// const sql = "insert into product(product_name,unit_price,quantity,total)values(?,?,?,?)";
const signupSyntax = "insert into Users(fullName,email,password,confirmPassword)values(?,?,?,?)";
const loginSyntax = "select * from Users where email =?";
const logoutSyntax = "select * from Users where email = ?";
// const updateLoginSyntax = "update Users set password = ? where email = ?";
const resetSyntax = "update Users set password = ? where email = ?";
const updateProfileSyntax = "UPDATE Users set fullName =?, Nickname =?, email =?, Contact =? where email =?";
const aboutusSyntax = "insert into contact_us(fullNames,userName,Message)values(?,?,?)";
const existingUser = "select * from Users where email =?";
const otpSyntax ="INSERT INTO OTP (email, otp, expiry_time) VALUES (?, ?, ?)";
const selectQuery = "SELECT otp, email FROM OTP WHERE otp =?" //SELECT * FROM OTP WHERE email = ? AND otp = ? AND expiry_time > NOW()";//
const resourceSyntax = 'SELECT * FROM resources';
const cousesSql='SELECT * FROM courses';
// const pwordChangeSyntax = "update Users set "
module.exports = {getConnection,runQueryValues,signupSyntax,loginSyntax,/*updateLoginSyntax,*/
updateProfileSyntax,aboutusSyntax,existingUser,resetSyntax,otpSyntax,selectQuery,resourceSyntax,cousesSql}