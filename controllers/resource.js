const { getConnection,runQueryValues,resourceSyntax,cousesSql } = require("../model/dbPool");
//Connect to MySQL
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database');
});
// Define endpoint to fetch resources
async function getresources(req, res){
    const connection = await getConnection();
    try {
      const result = await runQueryValues(connection, resourceSyntax)
      if (result) {
        res.json(result)
      }else if(err){
        console.error('Error fetching resources: ' + err.stack);
        res.status(500).json({ error: 'Internal server error' });
      return;
      }  
      async function mycourses(req, res){
        const result = await runQueryValues(connection, cousesSql)
        if (err) {
          console.error('Error fetching courses: ' + err.stack);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json(results);
      }; 
  }catch (err) {
    console.log(err)
}
}