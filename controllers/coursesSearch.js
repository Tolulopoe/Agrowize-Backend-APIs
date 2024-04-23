const {getConnection, runQueryValues, searchQuery} = require('../model/dbPool')
// Search endpoint
async function coursesSearch(req, res){
  const searchTerm = req.body.query; 

  if (!searchTerm) {
    return res.status(400).json({ error: 'Empty field!' });
  }

  // MySQL query to search in the 'users' table based on name or any other relevant criteria
const connection = await getConnection();
try{
  // Execute the query
 const result = await runQueryValues(connection,searchQuery , [`%${searchTerm}%`])
    if (result) {
      res.status(200).json(result); // Send the search results as JSON response
      console.log(result);
    }else {
      res.status(404).json(''); 
    }
  }catch (err) {
    console.error(err);
  } finally {
    connection.release();
  }
};
module.exports={coursesSearch}





// const express = require('express');
// const mysql = require('mysql');

// const app = express();
// const port = 3000;

// // Database connection configuration
// const dbConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'your_username',
//     password: 'your_password',
//     database: 'your_database'
// });

// // Connect to the database
// dbConnection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });

// // Route to fetch a value from the database
// app.get('/fetch-value', (req, res) => {
//     // SQL query to fetch a value from the database
//     const query = 'SELECT value FROM your_table WHERE condition = ?';

//     // Execute the query
//     dbConnection.query(query, [/* value for the condition */], (error, results) => {
//         if (error) {
//             console.error('Error fetching value from database:', error);
//             res.status(500).json({ error: 'An error occurred while fetching value from database' });
//         } else {
//             if (results.length > 0) {
//                 const value = results[0].value;
//                 res.status(200).json({ value: value });
//             } else {
//                 res.status(404).json({ error: 'Value not found' });
//             }
//         }
//     });
// });

// // Start the server
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
