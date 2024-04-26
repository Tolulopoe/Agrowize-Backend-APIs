const { getConnection, runQueryValues,enrolledUserQuery,lessonQuery } = require('../model/dbPool');
// to get lessons for a specific course
async function getUserLessons(req, res) {
  const user_id = req.decoded.userId
  const course_id = req.body.course_id;

  try {
    const connection = await getConnection();

const enrolled = await runQueryValues(connection,enrolledUserQuery,[user_id,course_id])
if (enrolled.length ==0){
  res.send({message: 'Error! You have not enrolled for this course'})
}else{
    const lessons = await runQueryValues(connection, lessonQuery, [course_id]);
  if (lessons){
    res.status(200).json({ lessons });
  }
    connection.release();
}  
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'An error occurred while fetching lessons.' });
  }
};

module.exports = {getUserLessons};
