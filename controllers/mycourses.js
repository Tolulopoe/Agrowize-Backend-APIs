const {getConnection,runQueryValues,mycoursesSyntax, courseQuery} = require('../model/dbPool');
async function mycourses(req, res) {
    const currentTime = new Date().getTime();
    const threeMonthsLater = new Date(currentTime);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    const threeMonthsLaterTimestamp = threeMonthsLater.getTime();
    const course ={
        user_id: req.decoded.userId,
        course_id: req.body.courseId,
        end_date: threeMonthsLaterTimestamp
    }
    if (course.course_id === "") {
        return res.status(412).json({ message: "Empty input fields!" });
    } 

const connection = await getConnection();
const findCourse = await runQueryValues(connection, courseQuery,[course.course_id])
if (findCourse.length==0){
    res.status(404).json({message: "this course does not exist"})
}else {
course.course_name = findCourse[0].course_name
}
try{
    const result = await runQueryValues(connection, mycoursesSyntax, [course.user_id,course.course_id,course.end_date]);
        if(result){
            res.status(200).json({ message: 'Course added successfully.' });
        }else(error)=>{
            console.error('Error inserting course data:', error);
            res.status(500).json({ error: 'An error occurred while adding course' });
        } 
    }catch (err) {
        console.error('Error adding course:', err);
    } finally {
        connection.release(); 
}
}
module.exports= {mycourses}