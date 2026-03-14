const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password NOT NULL,
    membership BOOLEAN NOT NULL DEFAULT FALSE,
    admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(50) NOT NULL,
    body VARCHAR(250) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    user_id INT REFERENCES users(id)
);

`;

const connectionString = process.argv[2];

async function main() {
    const client = new Client({
        connectionString
    })

    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
}

main();