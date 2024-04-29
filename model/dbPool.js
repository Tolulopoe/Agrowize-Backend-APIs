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
const userNameSyntax = 'SELECT fullName from Users where userid =?';
const profilepictureSyntax = 'UPDATE Users SET profile_photo_id = ? WHERE userid = ?';
const otpSyntax ="INSERT INTO OTP (email, otp, currentTime, expiry_time) VALUES (?, ?, ?, ?)";
const selectQuery = "SELECT otp, email,expiry_time FROM OTP WHERE otp =?" ;
const resendotpSyntax = "UPDATE OTP SET otp=?, currentTime=?, expiry_time=? WHERE email =?";
const resetSyntax = "update Users set password = ? where email =?";
const aboutusSyntax = "insert into contact_us(fullNames,userName,Message)values(?,?,?)";
const binaryDataSyntax = 'INSERT INTO binary_data (data, content_type, description,created_at,userid) values(?,?,?,?,?)'

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
const allsearchQuery = `-- Search through various tables, excluding sensitive fields
-- Corrected search through various tables, excluding sensitive fields
SELECT
  'Community' AS TableName,
  name AS Name
FROM
  Communities
WHERE
  name LIKE '%search_term%' 

UNION ALL

SELECT
  'Course' AS TableName,
  course_name AS Name,
  description AS Description
FROM
  Courses
WHERE
  course_name LIKE '%search_term%' OR
  description LIKE '%search_term%'

UNION ALL

SELECT
  'Lesson' AS TableName,
  lesson_title AS Name,
  lesson_content AS Description
FROM
  lessons
WHERE
  lesson_title LIKE '%search_term%' OR
  lesson_content LIKE '%search_term%'

UNION ALL

SELECT
  'Quiz' AS TableName,
  quiz_title AS Name,
  quiz_content AS Description
FROM
  quizzes
WHERE
  quiz_title LIKE '%search_term%' OR
  quiz_content LIKE '%search_term%'

`

// Courses
const mycoursesSyntax = 'INSERT INTO Enrollments (user_id, course_id) VALUES (?,?)';
const courseQuery = 'SELECT * FROM Courses where course_id =?'
const cousesSql= 'SELECT * FROM Enrollments INNER JOIN Courses ON Enrollments.course_id = Courses.course_id WHERE Enrollments.user_id = ?;'
const allCoursesSyntax = 'SELECT * FROM Courses';
const existingSignup = 'select * from Users where userid = ?'
const existingEnrollment = 'SELECT * FROM Enrollments WHERE user_id = ? AND course_id = ?;'


// Lessons
const enrolledLessonsSyntax = 'SELECT * FROM Courses INNER JOIN lessons ON Courses.course_id = lessons.course_id WHERE Courses.course_id = ?';
const lessonQuery = 'SELECT *  FROM lessons WHERE lessons.course_id = ?;'
const enrolledUserQuery = 'SELECT * FROM Enrollments WHERE user_id = ? AND course_id = ?';
const lessonsSQL= 'SELECT * FROM Enrollments INNER JOIN Courses ON Enrollments.course_id = Courses.course_id WHERE Enrollments.user_id = ?;'
const allLessonsSQL = 'SELECT * FROM lessons';

// quizzes
const fetchQuizzesQuery = `
  SELECT 
    quiz_id, 
    question
  FROM 
    quizzes 
  WHERE 
    course_id = ?
`;

//settings
const insertsettingsQuery= `insert into Settings (user_id, enable_notifications, event_notifications,
    weekly_personalized_course_recommendations,
    see_leadership_scores,
    assignment_reminders,
    enable_darkmode,
    newsletter_subscriptions) VALUES(?,?,?,?,?,?,?,?)`
const settingsQuery = `REPLACE INTO Settings (user_id, enable_notifications, event_notifications,
    weekly_personalized_course_recommendations,
    see_leadership_scores,
    assignment_reminders,
    enable_darkmode,
    newsletter_subscriptions) VALUES(?,?,?,?,?,?,?,?)`

//Communities
const joinCommunitySyntax= 'INSERT into user_communities (user_id,community_id) values(?,?)';
const getCommunityIdSyntax = "SELECT id FROM Communities WHERE name = ?";
const myCommunitiesSyntax = 'SELECT * FROM user_communities INNER JOIN Communities ON user_communities.community_id = Communities.id WHERE user_communities.user_id = ?';
const allCommunitiesSyntax = 'SELECT * FROM Communities';
// const CommunitiesSyntax= 'SELECT * from Communities where name =?';



module.exports = {getConnection,runQueryValues,signupSyntax,loginSyntax,logoutSyntax,/*updateLoginSyntax,*/
updateProfileSyntax,userNameSyntax,profilepictureSyntax,aboutusSyntax,existingUser,existingSubscriber,resetSyntax,findSessionsSQL,
otpSyntax,resendotpSyntax,selectQuery,allCoursesSyntax,mycoursesSyntax,
searchQuery,communitysearchQuery,allsearchQuery,cousesSql,subscribeSyntax,settingsQuery,joinCommunitySyntax,
courseQuery,myCommunitiesSyntax,getCommunityIdSyntax,sessionsSQL,allCommunitiesSyntax,
enrolledLessonsSyntax, enrolledUserQuery, lessonQuery, lessonsSQL, existingSignup,existingEnrollment,allLessonsSQL,
fetchQuizzesQuery,binaryDataSyntax}