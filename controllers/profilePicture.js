// const express = require('express');
const multer = require('multer');
// const ejs = require('ejs');
const path = require('path');
const { getConnection, runQueryValues, profilepictureSyntax } = require('../model/dbPool');
// const app = express();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  // destination: './uploads',
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // Create a unique file name using user_id and the original file extension
    const user_id = req.params.userid; // From route parameter
    const fileExt = path.extname(file.originalname);
    cb(null, `${user_id}${fileExt}`); // File name: user_id + extension
    console.log(fileExt)
  },
});

const fileFilter = (req, file, cb)=>{
  if (file.mimeType ==='image/jpeg' || file.mimeType==='image.png' || file.mimeType==='image.jpg'){
    cb(null, true);
  }else{
    cb(new Error('Unsupported File'), false);
  }
}

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024*1024*8
  },
 fileFilter: fileFilter
})


module.exports = { upload:upload}
// .single('profile_picture');

// Asynchronous function for profile upload
// const profileUpload = async (req, res) => {
  // try {
//     const user_id = req.decoded.userid; // Consistent reference to user_id

//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const profilePicturePath = req.file.path; // Path to the uploaded file

//     // Save the profile picture path in the database
//     const connection = await getConnection();
//     await runQueryValues(connection, profilepictureSyntax, [profilePicturePath, user_id]);
//     connection.release(); 

//     res.status(200).json({ message: 'Profile picture uploaded successfully.', path: profilePicturePath });
//   } catch (error) {
//     console.error('Error uploading profile picture:', error);
//     res.status(500).json({ error: 'An error occurred while uploading the profile picture.' });
//   }
// };

// // Endpoint for uploading profile pictures
// app.post('/Users/:userid/profile-picture', upload.single('profile_picture'), profileUpload);

// Use one module export to avoid errors


  // profileUpload, app };




// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const { getConnection, runQueryValues, profilepictureSyntax } = require('../model/dbPool');
// const app = express();

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     // Create a unique file name using user_id and the original file extension
//     const user_id = req.params.user_id; // From route parameter
//     const fileExt = path.extname(file.originalname);
//     cb(null, `${user_id}${fileExt}`); // File name: user_id + extension
//   },
// });

// const uploads = multer({ storage });

// // Asynchronous function for profile upload
// const profileUpload = async (req, res) => {
//   try {
//     const user_id = req.decoded.user_id; // Consistent reference to user_id

//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded.' });
//     }

//     const profile_picture_path = req.file.path; // Path to the uploaded file

//     // Save the profile picture path in the database
//     const connection = await getConnection();
//     await runQueryValues(connection, profilepictureSyntax, [profile_picture_path, user_id]);
//     connection.release(); // Always release the connection

//     res.status(200).json({ message: 'Profile picture uploaded successfully.', path: profile_picture_path });
//   } catch (error) {
//     console.error('Error uploading profile picture:', error);
//     res.status(500).json({ error: 'An error occurred while uploading the profile picture.' });
//   }
// };

// // Endpoint for uploading profile pictures
// app.post('/users/:user_id/profile-picture', uploads.single('profile_picture'), profileUpload);
  
// // Use one module export to avoid errors
// module.exports = { profileUpload, app};