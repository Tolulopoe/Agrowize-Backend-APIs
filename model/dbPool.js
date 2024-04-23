const mysql = require('mysql2')
// const pool = mysql.createPool(
//     {connectionLimit:10,
//         host:"localhost",
//         password:"",
//         user:"root",
//         database:"agrowize"
//     })
    const pool = mysql.createPool(
        {connectionLimit:15,
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
const existingUser = "select * from Users where email =?";
const loginSyntax = "select * from Users where email =?";
const updateProfileSyntax = "UPDATE Users set fullName =?, Nickname =?, email =?, Contact =? where email =?";
const otpSyntax ="INSERT INTO OTP (email, otp, currentTime, expiry_time) VALUES (?, ?, ?, ?)";
const selectQuery = "SELECT otp, email,expiry_time FROM OTP WHERE otp =?" ;
const resendotpSyntax = "UPDATE OTP SET otp=?, currentTime=?, expiry_time=? WHERE email =?";
const resetSyntax = "update Users set password = ? where email =?";
const aboutusSyntax = "insert into contact_us(fullNames,userName,Message)values(?,?,?)";

// Subscribe
const existingSubscriber = 'select * from Subscribers where email =?';
const subscribeSyntax= 'INSERT INTO Subscribers (email) values(?)';

// logout
const sessionsSQL = 'INSERT into Sessions(user_id, sessions_Id)values(?,?)';
const findSessionsSQL= 'SELECT * FROM Sessions where user_id=? and sessions_Id=?';
const logoutSyntax = "DELETE FROM Sessions WHERE sessions_Id = ?";

// Search queries
const searchQuery ="SELECT * FROM Courses WHERE course_name LIKE ?;"
const communitysearchQuery =`SELECT * FROM Communities WHERE name LIKE ?;`

// Courses
const mycoursesSyntax = 'INSERT INTO Enrollments (user_id, course_id) VALUES (?,?)';
const courseQuery = 'SELECT * FROM Courses where course_id =?'
const cousesSql= 'SELECT * FROM Enrollments INNER JOIN Courses ON Enrollments.course_id = Courses.course_id WHERE Enrollments.user_id = ?;'
const allCoursesSyntax = 'SELECT * FROM Courses';

const settingsQuery = 'REPLACE INTO Settings SET Name=? where user_id=?';


//Communities
const joinCommunitySyntax= 'INSERT into user_communities (user_id,community_id) values(?,?)';
const getCommunityIdSyntax = "SELECT id FROM Communities WHERE name = ?";
const myCommunitiesSyntax = 'SELECT * FROM user_communities INNER JOIN Communities ON user_communities.community_id = Communities.id WHERE user_communities.user_id = ?';
const allCommunitiesSyntax = 'SELECT * FROM Communities';
// const CommunitiesSyntax= 'SELECT * from Communities where name =?';



module.exports = {getConnection,runQueryValues,signupSyntax,loginSyntax,logoutSyntax,/*updateLoginSyntax,*/
updateProfileSyntax,aboutusSyntax,existingUser,existingSubscriber,resetSyntax,findSessionsSQL,otpSyntax,resendotpSyntax,selectQuery,allCoursesSyntax,mycoursesSyntax,
searchQuery,communitysearchQuery,cousesSql,subscribeSyntax,settingsQuery,joinCommunitySyntax,courseQuery,myCommunitiesSyntax,getCommunityIdSyntax,sessionsSQL,allCommunitiesSyntax}