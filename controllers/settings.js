const { getConnection, runQueryValues, settingsQuery } = require('../model/dbPool');

async function updateSettings(req, res) {
    const user_id = req.decoded.userId; // Retrieve the user ID from the JWT
    const settings = req.body; 
   settings.user_id = user_id;
    
    if (!settings) {
        return res.status(400).json({ error: 'Settings data is required.' });
    }

    try {
        const connection = await getConnection();

        const insert = await runQueryValues(connection,settingsQuery, [settings.user_id, settings.enable_notifications, settings.event_notifications, settings.weekly_personalized_course_recommendations,
settings.see_leadership_scores, settings.assignment_reminders, settings.enable_darkmode, settings.newsletter_subscriptions ])
        if (insert) {
            res.status(200).json({ message: 'Settings updated successfully.' });
        } else {
            res.status(500).json({ error: 'Failed to update settings.' });
        }

   } catch(err) {
         console.error('Error updating settings:', err);
            res.status(500).json({ error: 'Failed to insert new settings.' });
   }

}

module.exports = { updateSettings };



