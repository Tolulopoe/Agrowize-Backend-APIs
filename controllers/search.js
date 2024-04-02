const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// MySQL database connection configuration
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Connect to the database
dbConnection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Search endpoint
app.get('/search', (req, res) => {
  const searchTerm = req.query.q; // Assuming search query is passed as 'q' query parameter

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  // MySQL query to search in the 'users' table based on name or any other relevant criteria
  const query = `SELECT * FROM users WHERE name LIKE ?`;

  // Execute the query
  dbConnection.query(query, [`%${searchTerm}%`], (error, results) => {
    if (error) {
      console.error('Error performing search:', error);
      res.status(500).json({ error: 'An error occurred while performing search' });
    } else {
      res.status(200).json(results); // Send the search results as JSON response
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
