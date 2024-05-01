const { getConnection, runQueryValues, getUserInfoSyntax } = require('../model/dbPool');

async function profile(req, res)  {
  const userId = req.decoded.userId; 
   
  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  const connection = await getConnection(); 

    try {
  
    const existingUserInfo = await runQueryValues(connection, getUserInfoSyntax, [userId]);

    console.log(existingUserInfo)
    
    if (existingUserInfo.length === 0) { // User not found
      return res.status(404).json({ message: "User not found." });
    }

    // User found, return their profile info
    res.status(200).json({
      message: "User profile",
      data: existingUserInfo[0], 
    });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({
      message: "An error occurred while fetching the user profile.",
      error: error.message,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { profile };



// const { getConnection, runQueryValues, getUserInfoSyntax } = require('../model/dbPool');
// const secret = "agrowize";
// const profile = async (req, res) => {
//   const connection = await getConnection();
//   try {
//     const userId = req.decoded.userId;
//   console.log(req.decoded.userId)
//     const existingUserInfo = await runQueryValues(connection, getUserInfoSyntax, [userId]);
//     console.log(existingUserInfo)
//     if (existingUserInfo.length === 0) { 
//       connection.release(); 
//       return res.status(404).json({ message: "User not found" });
//     }else{
//       res.status(200).json({message: 'userprofile: ' ,existingUserInfo})
//     }
//   } catch (error) {
//     connection.release();
//     return res.status(500)
//     // .json({ 
//     //   message: "An error occurred while updating the profile"});
//   }
// };
// module.exports = { profile };


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