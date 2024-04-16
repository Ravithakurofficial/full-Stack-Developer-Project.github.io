const { Pool } = require('pg');

// Configure the connection parameters
const pool = new Pool({
    user: 'neondb_owner',
    host: 'ep-wispy-hall-a11hg9zo.ap-southeast-1.aws.neon.tech',
    database: 'neondb',
    password: 'n4tIGJ7xQdFb',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

async function createSchemaAndTable() {
    const client = await pool.connect();

    try {
        // Create a new schema if it doesn't exist
        await client.query('CREATE SCHEMA IF NOT EXISTS user_data');

        // Create a table within the 'user_data' schema
        const createTableText = `
            CREATE TABLE IF NOT EXISTS user_data.users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `;
        await client.query(createTableText);

        console.log("Schema and table have been created successfully.");
    } catch (error) {
        console.error('Error creating schema and table:', error);
    } finally {
        client.release();
    }
}

module.exports = {
    pool,
    createSchemaAndTable
};
