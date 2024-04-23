const { getConnection, runQueryValues, joinCommunitySyntax, myCommunitiesSyntax } = require('../model/dbPool');
// Endpoint to join a community

async function communitiesJoin(req, res) {
  const commId ={
    user_id: req.decoded.userId,
    community_id : req.body.Id
  }
  // Check if required data is provided
    if (!commId.user_id || !commId.community_id) {
    return res.status(400).json({ error: 'Missing required data' });
  }

  const connection = await getConnection();

  try {
    // Check if the user already joined the community
    const alreadyJoined = await runQueryValues(connection, myCommunitiesSyntax, [commId.community_id]);

    console.log(alreadyJoined);

    if (alreadyJoined.length > 0) {
      // User already joined this community
      return res.status(400).json({ error: 'User already joined this community' });
    }

    // Insert user into the user_communities table
    const result = await runQueryValues(connection, joinCommunitySyntax, [commId.user_id, commId.community_id]);

    if (result) {
      res.status(200).json({ message: `Congratulations! You have successfully joined ${commId.community_id}` });
    } else {
      res.status(500).json({ error: 'An unknown error occurred during the join operation.' });
    }

  } catch (err) {
    console.error('Error joining community:', err);
    res.status(500).json({ error: 'An error occurred while joining the community.' });
  } finally {
    connection.release(); // Always release the connection in the finally block
  }
}

module.exports = { communitiesJoin };

// const { getConnection, runQueryValues, getCommunityIdSyntax, joinCommunitySyntax, myCommunitiesSyntax } = require('../model/dbPool');

// async function communitiesJoin(req, res) {
//   const community_Id = req.community_id;
//   const email = req.body.email;

//   if (!community_Id || !email) {
//     return res.status(400).json({ error: 'Missing required data' });
//   }

//   const connection = await getConnection();

//   try {
//     // Fetch the community ID based on the community name
//     const communityData = await runQueryValues(connection, getCommunityIdSyntax, [community_Id]);
    
//     if (communityData.length === 0) {
//       return res.status(404).json({ error: 'Community not found' });
//     }
    
//     const communityId = communityData[0].id;

//     // Check if the user already joined the community
//     const alreadyJoined = await runQueryValues(connection, myCommunitiesSyntax, [communityId, email]);

//     if (alreadyJoined.length > 0) {
//       return res.status(400).json({ error: 'User already joined this community' });
//     }

//     // Insert user into the user_communities table
//     const result = await runQueryValues(connection, joinCommunitySyntax, [communityId, email]);

//     if (result) {
//       res.status(200).json({ message: `Congratulations! You have successfully joined ${communityName}` });
//     } else {
//       res.status(500).json({ error: 'An unknown error occurred during the join operation.' });
//     }

//   } catch (err) {
//     console.error('Error joining community:', err);
//     res.status(500).json({ error: 'An error occurred while joining the community.' });
//   } finally {
//     connection.release(); // Always release the connection in the finally block
//   }
// }

// module.exports = { communitiesJoin };




// const {getConnection, runQueryValues, joinCommunitySyntax,myCommunitiesSyntax} = require('../model/dbPool');
// // Endpoint to join a community
// async function communitiesJoin(req, res){
//   const community_name = req.body.community_name;
//   const email = req.body.email; 
//   // Check if user ID and community ID are provided
//   if (!community_name || !email) {
//     return res.status(400).send('Missing required data');
//   }
//   // Check if user already joined the community (optional)
//   const connection = await getConnection();

//   const alreadyJoined = await runQueryValues(connection, myCommunitiesSyntax,[community_name, email])
//       // User already joined
    
//       if (alreadyJoined.length > 0) {
//         return res.status(400).send({ error: 'User already joined this community' });
      
//       }else if(alreadyJoined.length=0){
//         console.log(alreadyJoined.length)
//       // Insert user into the user_communities table
//       try{
//       const result = await runQueryValues(connection, joinCommunitySyntax, [community_name,email])
//       if (result){
//         res.status(200).json({message: `congratulations! You have successfully joined ${community_name}`})
//       }else if (!result) {
//             return res.status(500).send({ error: error.message });
//           }
// console.log(result)
//       }catch(err){
//         console.log(err)
//       }finally{
//         connection.release()
//       }
//     }
// };
// module.exports={communitiesJoin}





// const { getConnection, runQueryValues, joinCommunitySyntax, myCommunitiesSyntax } = require('../model/dbPool');

// // Endpoint to join a community
// async function communitiesJoin(req, res) {
//   const community_name = req.body.community_name;
//   const email = req.body.email;

//   // Check if required data is provided
//   if (!community_name || !email) {
//     return res.status(400).json({ error: 'Missing required data' });
//   }

//   const connection = await getConnection();

//   try {
//     // Check if the user already joined the community
//     const alreadyJoined = await runQueryValues(connection, myCommunitiesSyntax, [community_name, email]);
//     console.log(alreadyJoined);

//     if (alreadyJoined.length > 0) {
//       // User already joined this community
//       return res.status(400).json({ error: 'User already joined this community' });
//     }

//     // Insert user into the user_communities table
//     const result = await runQueryValues(connection, joinCommunitySyntax, [community_name, email]);

//     if (result) {
//       res.status(200).json({ message: `Congratulations! You have successfully joined ${community_name}` });
//     } else {
//       res.status(500).json({ error: 'An unknown error occurred during the join operation.' });
//     }
//   } catch (err) {
//     console.error('Error joining community:', err);
//     res.status(500).json({ error: 'An error occurred while joining the community.' });
//   } finally {
//     connection.release(); // Always release the connection
//   }
// }

// module.exports = { communitiesJoin };