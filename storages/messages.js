const db = require('../config/database');

async function getMessages() {
    const { rows } = await db.query('SELECT * FROM messages m JOIN users u ON m.user_id = u.id');
    return rows;
}

async function createMessage(title, message, id) {
    await db.query("INSERT INTO messages (title, body, user_id) VALUES ($1, $2, $3)", [title, message, id] )
}

module.exports = {
    getMessages,
    createMessage,
}