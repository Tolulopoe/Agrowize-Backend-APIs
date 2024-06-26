const { getConnection, runQueryValues, getUserInfoSyntax, updateProfileDetailsSyntax } = require('../model/dbPool');

const profileUpdate = async (req, res) => {
  const connection = await getConnection();

  try {
    const userId = req.decoded.userId; // Assume user ID is derived from a token or session
    
    // Fetch existing user information to pre-fill data
    const existingUserInfo = await runQueryValues(connection, getUserInfoSyntax, [userId]);
    
    if (existingUserInfo.length === 0) { // User not found
      connection.release(); 
      return res.status(404).json({ message: "User not found" });
    }
    
    const currentUser = existingUserInfo[0];
    res.send(currentUser)
    
    // Default to existing values if new values are not provided
    const update = {
      fullName: req.body.fullname || currentUser.fullname,
      email: req.body.username || currentUser.username,
      Nickname: req.body.nickname || currentUser.nickname,
      Contact: req.body.phoneno || currentUser.phoneno,
    };

    // Update the profile with the new or existing information
    const updateResult = await runQueryValues(connection, updateProfileDetailsSyntax, [
      update.Nickname, update.Contact, userId
    ]);

    connection.release(); 
    if (updateResult.affectedRows > 0) { 
      return res.status(200).json({ message: "Profile updated successfully", user: update });
    } else {
      return res.status(500).json({ message: "Profile update failed" });
    }

  } catch (error) {
    connection.release();
    // console.error("Error updating profile:", error);
    return res.status(500)
    // .json({ 
    //   message: "An error occurred while updating the profile"});
  }
};
module.exports = { profileUpdate };


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