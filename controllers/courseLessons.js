const { getConnection, runQueryValues,lessonQuery, enrolledLessonsSyntax } = require('../model/dbPool');
// to get lessons for a specific course
async function getcourseLessons(req, res) {

  const course_id = req.body.course_id;

  try {
    const connection = await getConnection();
    const lessons = await runQueryValues(connection, enrolledLessonsSyntax, [course_id]);

    connection.release();

    res.status(200).json({ lessons });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'An error occurred while fetching lessons.' });
  }
};

module.exports = {getcourseLessons};
