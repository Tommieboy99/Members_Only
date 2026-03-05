const db = require("../config/database");

async function createUser(firstName, lastName, username, password) {
    await db.query("INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4)", [firstName, lastName, username, password]);
}

async function userExists(username) {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    return result.rows.length > 0;
}

async function getUserOnUsername(username) {
    const { rows } = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = rows[0];
    return user;
}

async function getUserOnId(id) {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];
    return user;
}

module.exports = {
    createUser,
    userExists,
    getUserOnUsername,
    getUserOnId,
}