const { getConnection, runQueryValues, settingsQuery } = require('../model/dbPool');

async function updateSettings(req, res) {
    const user_id = req.decoded.userId; // Retrieve the user ID from the JWT
    const settings = req.body; // Assume 'settings' is a key with a value object of settings
    
    if (!settings) {
        return res.status(400).json({ error: 'Settings data is required.' });
    }

    try {
        const connection = await getConnection();

        const result = await runQueryValues(
            connection,
            settingsQuery, // This query should handle update/insert
            { user_id, ...settings } // Spread operator to insert settings
        );
        
        connection.release(); // Always release the connection
        
        if (result) {
            res.status(200).json({ message: 'Settings updated successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to update settings.' });
        }
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ error: 'An error occurred while updating settings.' });
    }
}

module.exports = { updateSettings };



// const { getConnection,runQueryValues,settingsQuery } = require('../model/dbPool'); 

// async function settings(req, res) {
// // POST endpoint to create or update settings for a specific user
// async (req, res) => {
//     const user_id = req.decoded.userId;
//     const Name = req.body.settings;
//     try {
//         const connection = await getConnection();
//         const result = await runQueryValues(connection, settingsQuery,{ user_id: req.decoded.userId, ...Settings });
//         connection.release();
//         if (result){
//         res.status(200).json({ message: 'Settings updated successfully' });
//         }
//     } catch (error) {
//         console.error('Error updating settings:', error);
//         res.status(500).json({ error: 'An error occurred while updating settings.' });
//     }
// };
// }
// module.exports = {settings};
