const {getConnection,runQueryValues,mycoursesSyntax} = require('../model/dbPool');

async function mycourses(req, res) {
    const currentTime = new Date().getTime();
    const threeMonthsLater = new Date(currentTime);
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
    const threeMonthsLaterTimestamp = threeMonthsLater.getTime();
    const course ={
        email: req.body.email,
        course_name: req.body.coursename,
        end_date: threeMonthsLaterTimestamp
    }
    if (course.email === "" || course.course_name === "") {
        return res.status(412).json({ message: "Empty input fields!" });
    } 
const connection = await getConnection();
try{
    const result = await runQueryValues(connection, mycoursesSyntax, [course.email,course.course_name,course.end_date]);
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