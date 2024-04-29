const { getConnection, runQueryValues, profilepictureSyntax, binaryDataSyntax } = require('../model/dbPool');
const updateProfilePhoto = async (req, res) => {
    const MAX_BASE64_SIZE = 6827584;
    // const fs = require('fs');

// Read the file (binary)
// const imageData = fs.readFileSync('uploads/image1.jpeg');

// Convert to base64
// const fullbase64Data = imageData.toString('base64');

// Example: Show a shortened version for readability
// const base64Data = `${fullbase64Data.substring(0, 30)}...`; // Display only the first 30 characters

  try {
    // Extract the data from the request body
    const base64Data = req.body.base64Data;
    const contentType = req.body.contentType;
    const fileName = req.body.fileName;
    const userId = req.decoded.userId; 

    if (!base64Data || !contentType || !fileName) {
      return res.status(400).json({ message: "Missing required fields." });
    }else if (base64Data.length > MAX_BASE64_SIZE) {
        return res.status(413).json({ message: "File too large. Maximum size is 5 MB." });
      }
      const shortBase64 = base64Data.substring(0, 30);
    const connection = await getConnection(); 
    // Insert binary data into the binary_data table
    const insertResult = await runQueryValues(connection, binaryDataSyntax, [shortBase64, contentType, fileName, new Date(),userId]);

    if (insertResult.affectedRows > 0) {
      // Update the user's profile photo with the inserted binary data's ID
      const profilePhotoId = insertResult.insertId;
      const updateResult = await runQueryValues(connection, profilepictureSyntax, [profilePhotoId, userId]);

      if (updateResult.affectedRows > 0) {
        res.status(200).json({ message: "Profile picture updated successfully." });
      } else {
        res.status(500).json({ message: "Failed to update profile picture." });
      }
    } else {
      res.status(500).json({ message: "Failed to insert binary data." });
    }

  } catch (error) {
    console.error("Error updating profile picture:", error);
    res.status(500).json({ message: "An error occurred while updating the profile picture." });

  } finally {
    const connection = await getConnection();
    connection.release(); // Release the connection to prevent resource leaks
  }
};

module.exports = { updateProfilePhoto };




// const { fetchWithRetries } = require('../utils/httpHelpers');
// const runQueryWithRetries = async (connection, query, params, maxRetries = 3) => {
//     let retries = 0;
  
//     while (retries < maxRetries) {
//       try {
//         const result = await runQueryValues(connection, query, params);
//         return result; // Return result if query is successful
//       } catch (error) {
//         if (retries < maxRetries - 1) { // Retry condition
//           retries++;
//           const delay = Math.pow(2, retries) * 100; // Exponential backoff
//           await new Promise((resolve) => setTimeout(resolve, delay));
//         } else {
//           throw error; // If max retries reached, throw the error
//         }
//       }
//     }
//   };

//   const updateProfilePhoto = async (req, res) => {
//     const MAX_BASE64_SIZE = 6827584;
  
//     try {
//       const base64Data = req.body.base64Data;
//       const contentType = req.body.contentType;
//       const fileName = req.body.fileName;
//       const userId = req.decoded.userId;
  
//       if (!base64Data || !contentType || !fileName) {
//         return res.status(400).json({ message: "Missing required fields." });
//       } else if (base64Data.length > MAX_BASE64_SIZE) {
//         return res.status(413).json({ message: "File too large. Maximum size is 5 MB." });
//       }
  
//       const connection = await getConnection();
  
//       // Retry logic for inserting binary data
//       const insertResult = await runQueryWithRetries(connection, binaryDataSyntax, [base64Data, contentType, fileName, new Date(), userId], 3);
  
//       if (insertResult.affectedRows > 0) {
//         const profilePhotoId = insertResult.insertId;
  
//         // Retry logic for updating user profile
//         const updateResult = await runQueryWithRetries(connection, profilepictureSyntax, [profilePhotoId, userId], 3);
  
//         if (updateResult.affectedRows > 0) {
//           res.status(200).json({ message: "Profile picture updated successfully." });
//         } else {
//           res.status(500).json({ message: "Failed to update profile picture." });
//         }
//       } else {
//         res.status(500).json({ message: "Failed to insert binary data." });
//       }
  
//     } catch (error) {
//       console.error("Error updating profile picture:", error);
//       res.status(500).json({ message: "An error occurred while updating the profile picture." });
  
//     } finally {
//       const connection = await getConnection();
//       connection.release(); // Always release the connection to prevent resource leaks
//     }
//   };
//   module.exports = { updateProfilePhoto };


// const {getConnection,runQueryValues,profilepictureSyntax, binaryDataSyntax} = require('../model/dbPool')
// async function updateProfile(req,res){
  
//     const update = {
//         base64Data: req.body.base64Data,
//         contentType: req.body.contentType,
//         fileName: req.body.fileName,
        
//     }
//     console.log(update)
//     const connection = await getConnection();
//     const result =  await runQueryValues(connection,binaryDataSyntax,[update.base64Data,update.contentType,update.fileName])
// res.status(200).json({message:result})
//    try{
//    const result =  await runQueryValues(connection,profilepictureSyntax,[update.base64Data,update.contentType,update.fileName])
// res.status(200).json({message:result})
//    }
//    catch(err){
//    console.log(err)
//    }   
//    }
// module.exports = {updateProfile}