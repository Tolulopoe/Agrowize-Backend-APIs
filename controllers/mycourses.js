const { getConnection, runQueryValues, mycoursesSyntax, existingSignup, courseQuery } = require('../model/dbPool');

async function mycourses(req, res) {
  const currentTime = new Date().getTime();
  const threeMonthsLater = new Date(currentTime);
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  const threeMonthsLaterTimestamp = threeMonthsLater.getTime();

  const course = {
    user_id: req.decoded.userId,
    course_id: req.body.courseId,
    end_date: threeMonthsLaterTimestamp,
  };

  if (!course.course_id) { // Check for empty course_id
    return res.status(412).json({ message: "Course ID is required." });
  }

  const connection = await getConnection();

  try {
    const findCourse = await runQueryValues(connection, courseQuery, [course.course_id]);
    
    if (findCourse.length === 0) { // Correct comparison
      connection.release();
      return res.status(404).json({ message: "This course does not exist." });
    }
    
    course.course_name = findCourse[0].course_name;

    const exists = await runQueryValues(connection, existingSignup, [course.user_id]);

    if (exists.length === 0) { 
      connection.release();
      return res.status(400).json({
        success: false,
        message: "User does not exist. Please sign up before registering for a course.",
      });
    }
    const result = await runQueryValues(connection, mycoursesSyntax, [course.user_id, course.course_id, course.end_date]);

    if (result) {
      res.status(200).json({ message: 'Course added successfully.' });
    } else {
      res.status(500).json({ error: 'An unknown error occurred while adding the course.' });
    }

  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ error: 'An error occurred while adding the course.' });

  } finally {
    connection.release(); // Always release the connection
  }
}

module.exports = { mycourses };



// const {getConnection,runQueryValues,mycoursesSyntax, existingSignup, courseQuery} = require('../model/dbPool');
// async function mycourses(req, res) {
//     const currentTime = new Date().getTime();
//     const threeMonthsLater = new Date(currentTime);
//     threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
//     const threeMonthsLaterTimestamp = threeMonthsLater.getTime();
//     const course ={
//         user_id: req.decoded.userId,
//         course_id: req.body.courseId,
//         end_date: threeMonthsLaterTimestamp
//     }
//     if (course.course_id === "") {
//         return res.status(412).json({ message: "Empty input fields!" });
//     } 

// const connection = await getConnection();
// const findCourse = await runQueryValues(connection, courseQuery,[course.course_id])
// if (findCourse.length==0){
//     res.status(404).json({message: "this course does not exist"})
// }else {
// course.course_name = findCourse[0].course_name
// }
// const exists = await runQueryValues(connection, existingSignup, [
//     course.user_id,
//   ]);
//   console.log("exists ", exists);
//   if ((exists.length = 0)) {
//     return res.status(400).json({
//       success: false,
//       message: "User does not exist, please sign up before you can register for this course",
//     });
//   } else if (exists.length > 0) {
// try{

//     const result = await runQueryValues(connection, mycoursesSyntax, [course.user_id,course.course_id,course.end_date]);
//         if(result){
//             res.status(200).json({ message: 'Course added successfully.' });
//         }else(error)=>{
//             console.error('Error inserting course data:', error);
//             res.status(500).json({ error: 'An error occurred while adding course' });
//         } 
//     }catch (err) {
//         console.error('Error adding course:', err);
//     } finally {
//         connection.release(); 
// }
// }
// }
// module.exports= {mycourses}