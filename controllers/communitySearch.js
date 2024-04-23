const {getConnection, runQueryValues, communitysearchQuery} = require('../model/dbPool')
// Search endpoint
async function commSearch(req, res){
  const searchTerm = req.body.query; 

  if (!searchTerm) {
    return res.status(400).json({ error: 'Empty field!' });
  }

  // MySQL query to search in the 'users' table based on name or any other relevant criteria
const connection = await getConnection();
try{
  // Execute the query
 const result = await runQueryValues(connection,communitysearchQuery , [`%${searchTerm}%`])
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
module.exports={commSearch}