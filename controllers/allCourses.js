const { getConnection, runQueryValues, allCoursesSyntax } = require('../model/dbPool');

// Endpoint to fetch all communities


async function allCourses(req, res) {

  const connection = await getConnection();
try{
    // Insert user into the user_communities table
    const result = await runQueryValues(connection, allCoursesSyntax);

    if (result) {
      res.status(200).json({ message: result});
    } else {
      res.status(500).json({ error: 'error occured' });
    }

  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'An error occurred while fetching the courses.' });
  } finally {
    connection.release(); 
  }
}

module.exports = { allCourses };