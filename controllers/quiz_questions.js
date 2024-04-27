
const { getConnection, runQueryValues,fetchQuizzesQuery } = require('../model/dbPool');

// SQL query to fetch quiz questions for a specific course


async function quizzes(req, res){
  const course_id = req.params.course_id;

  try {
    const connection = await getConnection();
    const quizzes = await runQueryValues(connection, fetchQuizzesQuery, [course_id]);

    connection.release(); // Always release the connection

    res.status(200).json({ quizzes }); // Return only quiz questions, without answers
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'An error occurred while fetching quizzes.' });
  }
};

module.exports = {quizzes};
