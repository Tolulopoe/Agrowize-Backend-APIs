const { resolveInclude } = require('ejs');
const { getConnection, runQueryValues,subscribeSyntax,existingSubscriber } = require('../model/dbPool');
// Define the endpoint for subscribing
async function subscribe(req, res) {
    try {
        // Retrieve the subscription information from the request body
        const { email } = req.body;
 // Validate the subscription information (e.g., check if email is valid)
        if (email === "") {
            return res.status(412).json({ message: "Empty input fields!" });
        }else if(!email) {
            return res.status(412).json({ message: "email does not exist" });
        }
    }catch(err){
        console.log(err)
    }
        
    // Save the subscription information to your database or perform any other necessary actions
        // For example, you can store the email in a subscribers table in your database
    const connection = await getConnection();
    try {
        const existing = await runQueryValues(connection, existingSubscriber, [
          req.body.email,
        ]);
        console.log("exists ", existing);
        if ((existing.length >0)) {
          return res.status(400).json({
            success: false,
            message: "Already subscribed!",
          });
        } else if (existing.length == 0) {
          return res.status(200).json({
            success: true,
            message: "subscribed successfully",
          });
        }
    }catch(err){
        console.err(err)
    }
   
    const result = await runQueryValues(connection,subscribeSyntax,[req.body.email]);
     res.status(200).json({ message: 'Subscribed successfully!', result })
     if (result.length >1){
        res.json({message: 'Already subscribed!'})
     }
    // }catch (err) {
    // // Handle any errors that occur during subscription process
    // console.error('Error subscribing:', err);
    // // res.status(500).json({ err: 'An error occurred while processing subscription.' });
    // }
    };

module.exports = {subscribe};