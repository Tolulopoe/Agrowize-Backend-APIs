const { getConnection, runQueryValues,myCommunitiesSyntax } = require('../model/dbPool');

// Endpoint to join a community
async function communitiesJoined(req, res) {
  const user_id = req.decoded.userId;

  // Check if required data is provided
  if (!user_id) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  const connection = await getConnection();

  try {
    const result = await runQueryValues(connection, myCommunitiesSyntax, [req.decoded.userId]);
    try{
        if(result){
            storedCommunity = result.community_name
        console.log(storedCommunity)
        res.status(200).json(result);
    }else(error)=>{
        console.error('Error fetching community data:', error);
        res.status(500).json({ error: 'An error occurred while fetching the community data' });
    } 
}catch(err){
  console.log(err)
};

  } catch (err) {
    console.error('Error fetching communities:', err);
    // res.status(500).json({ error: 'An error occurred while joining the community.' });
  } finally {
    connection.release(); // Always release the connection in the finally block
  }
}

module.exports = { communitiesJoined };