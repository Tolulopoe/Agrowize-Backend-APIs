const { getConnection, runQueryValues, allLessonsSQL } = require('../model/dbPool');

// Endpoint to fetch all communities


async function allLessons(req, res) {

  const connection = await getConnection();
try{
    // Insert user into the user_communities table
    const result = await runQueryValues(connection, allLessonsSQL);

    if (result) {
      res.status(200).json({ message: result});
    } else {
      res.status(500).json({ error: 'error occured' });
    }

  } catch (err) {
    console.error('Error fetching lessons:', err);
    res.status(500).json({ error: 'An error occurred while fetching the lessons for this Course.' });
  } finally {
    connection.release(); 
  }
}

module.exports = { allLessons };