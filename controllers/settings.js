
const { getConnection,runQueryValues,settingsQuery } = require('../model/dbPool'); 

async function settings(req, res) {
// POST endpoint to create or update settings for a specific user
async (req, res) => {
    const user_id = req.decoded.userId;
    const settings = req.body;
    try {
        const connection = await getConnection();
        
        const result = await runQueryValues(connection, settingsQuery,{ user_id: req.decoded.userId, settings });
        connection.release();
        if (result){
        res.status(200).json({ message: 'Settings updated successfully' });
        }
    } catch (error) {
        console.error('Error updating settings:', error);
        res.status(500).json({ error: 'An error occurred while updating settings.' });
    }
};
}
module.exports = {settings};


//     const userId = req.params.userId;
//     try {
//         const connection = await getConnection();
//         const query = 'SELECT * FROM Settings WHERE user_id = ?';
//         const settings = await connection.query(query, userId);
//         connection.release();
//         res.status(200).json(settings);
//     } catch (error) {
//         console.error('Error fetching settings:', error);
//         res.status(500).json({ error: 'An error occurred while fetching settings.' });
//     }
// });

// DELETE endpoint to delete settings for a specific user
// async function resetSettings(req, res) {
//     const userId = req.params.userId;
//     try {
//         const connection = await getConnection();
//         const query = 'DELETE FROM Settings WHERE user_id = ?';
//         await connection.query(query, userId);
//         connection.release();
//         res.status(200).json({ message: 'Settings deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting settings:', error);
//         res.status(500).json({ error: 'An error occurred while deleting settings.' });
//     }
// };

