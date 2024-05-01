
const { getConnection, runQueryValues, getUserInfoSyntax } = require('../model/dbPool');
const fetchProfile = async (req, res) => {
  const connection = await getConnection();
  if (!connection) {
          console.error('Connection is undefined');
          return res.status(500).json({ message: "Database connection failed" });
        }
  try {
    const userId = req.decoded.userId;
    console.log('User ID:', userId); 
        console.log('Connection:', getConnection());
    const existingUserInfo = await runQueryValues(connection, getUserInfoSyntax, [userId]);
    console.log(existingUserInfo)
    if (existingUserInfo.length === 0) { 
      connection.release(); 
      return res.status(404).json({ message: "User not found" });
    }else{
      res.status(200).json({message: 'userprofile: ' ,existingUserInfo})
    }
  } catch (error) {
        console.error('Error in profile function:', error);
    
        return res.status(500).json({ 
          message: "An error occurred while fetching the profile",
          error: error.message, 
        });
}finally{
  connection.release()
}
};
module.exports = { fetchProfile };


// const { getConnection, runQueryValues, getUserInfoSyntax } = require('../model/dbPool');
// async function fetchProfile(req, res) {
//     const connection = await getConnection();
//     if (!connection) {
//       console.error('Connection is undefined');
//       return res.status(500).json({ message: "Database connection failed" });
//     }
//     const userId = req.decoded?.userId; 
//     if (!userId) {
//       return res.status(400).json({ message: "Invalid user ID" });
//     }
//     console.log('User ID:', userId); // Debugging information
//     console.log('Connection:', getConnection()); // Check the connection object
// try{
//     const existingUserInfo = await runQueryValues(connection, getUserInfoSyntax, [userId]);
//     if (existingUserInfo.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     return res.status(200).json({ message: 'User profile:', existingUserInfo });

//   } catch (error) {
//     console.error('Error in profile function:', error);

//     return res.status(500).json({ 
//       message: "An error occurred while fetching the profile",
//       error: error.message, 
//     });

//   } finally {
//     if (connection) {
//       connection.release(); 
//     } else {
//       console.warn('Connection was not released because it is undefined');
//     }
//   }
// }

// module.exports = { fetchProfile };





    // const currentUser = existingUserInfo[0];
    // res.send(currentUser)
    
    // Default to existing values if new values are not provided
    // const update = {
    //   fullName: req.body.fullname || currentUser.fullname,
    //   email: req.body.username || currentUser.username,
    //   Nickname: req.body.nickname || currentUser.nickname,
    //   Contact: req.body.phoneno || currentUser.phoneno,
    // };

    // // Update the profile with the new or existing information
    // const updateResult = await runQueryValues(connection, updateProfileDetailsSyntax, [
    //   update.Nickname, update.Contact, userId
    // ]);

    // connection.release(); 
    // if (updateResult.affectedRows > 0) { 
    //   return res.status(200).json({ message: "Profile updated successfully", user: update });
    // } else {
    //   return res.status(500).json({ message: "Profile update failed" });
    // }

  


// Default to existing values if new values are not provided
// const update = {
//     fullName: req.body.fullname || currentUser.fullname,
//     email: req.body.username || currentUser.username,
//     Nickname: req.body.nickname || currentUser.nickname,
//     Contact: req.body.phoneno || currentUser.phoneno,
//   };
//   res.status(200).send(`${currentUser.fullName}, ${currentUser.email}`);
//   // Update the profile with the new or existing information
//   const updateResult = await runQueryValues(connection, updateProfileDetailsSyntax, [
//     update.Nickname, update.Contact, userId
//   ]);

//   connection.release(); // Release the connection

//   if (updateResult.affectedRows > 0) { // Check if the update was successful
//     return res.status(200).json({ message: "Profile updated successfully", user: update });
//   } else {
//     return res.status(500).json({ message: "Profile update failed" });
//   }

// } catch (error) {
//   connection.release(); // Ensure the connection is released in case of an error
//   console.error("Error updating profile:", error);
//   return res.status(500).json({ message: "An error occurred while updating the profile" });
// }