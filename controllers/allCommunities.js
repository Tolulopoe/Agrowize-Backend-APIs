const { getConnection, runQueryValues, allCommunitiesSyntax } = require('../model/dbPool');

// Endpoint to fetch all communities


async function allCommunities(req, res) {

  const connection = await getConnection();
try{
    // Insert user into the user_communities table
    const result = await runQueryValues(connection, allCommunitiesSyntax);

    if (result) {
      res.status(200).json({ message: result});
    } else {
      res.status(500).json({ error: 'error occured' });
    }

  } catch (err) {
    console.error('Error joining community:', err);
    res.status(500).json({ error: 'An error occurred while fetching the communities.' });
  } finally {
    connection.release(); 
  }
}

module.exports = { allCommunities };