
const { getConnection, runQueryValues, updateProfileSyntax } = require('../model/dbPool');

async function updateProfile(req, res) {
    const update = {
        fullName: req.body.fullname,
        email: req.body.username,
        Nickname: req.body.nickname,
        Contact: req.body.phoneno
    };

    const connection = await getConnection();
    
    try {
        const result = await runQueryValues(connection, updateProfileSyntax, [
            update.fullName,
            update.email,
            update.Nickname,
            update.Contact,
            update.email // Using email to identify the row to update
        ]);
        res.status(200).json({ message: result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while updating the profile.' });
    } finally {
        connection.release(); // Release the connection after usage
    }
}

module.exports = { updateProfile };