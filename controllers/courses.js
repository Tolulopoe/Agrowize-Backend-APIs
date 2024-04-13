const {getConnection,runQueryValues,cousesSql,existingUser} = require('../model/dbPool');

async function courses(req, res) {
   
    const courses ={
        email: req.body.email,
    }
    
    if (courses.email === "") {
        return res.status(412).json({ message: "Empty input fields!" });
    } 
const connection = await getConnection();
const exists = await runQueryValues(connection, existingUser, [
    courses.email,
  ]);
  console.log("exists ", exists);
  if ((exists.length = 0)) {
    return res.status(400).json({
      success: false,
      message: "User does not exist",
    });
  } else if (exists.length > 0) {
    return res.status(200).json({
      message: "logged in successfully",
    });
  }
try{
    const result = await runQueryValues(connection, cousesSql, [courses.email]);
        
          try{
            if(result){
            storedCourses = result[0].course_name
            console.log(storedCourses)
            res.status(200).json(result);
        }else(error)=>{
            console.error('Error fetching course data:', error);
            res.status(500).json({ error: 'An error occurred while fetching the course data' });
        } 
    }catch(err){
      console.log(err)
    };
  }catch(err) {
  console.error(err);
} finally {
  connection.release(); 
}
}
module.exports= {courses}