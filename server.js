const express = require('express');
const { pool } = require('./app'); // Import the configured PostgreSQL pool
const { createSchemaAndTable } = require('./app'); // Import the createSchemaAndTable function
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL; // Get the DATABASE_URL environment variable
const resendApiKey = process.env.RESEND_API_KEY; // Get the RESEND_API_KEY environment variable

app.use(express.json());

// Create database schema and table on server startup
createSchemaAndTable().catch(console.error);

// Endpoint to handle user signup
app.post('/signup', async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        const client = await pool.connect();

        const checkUserQuery = 'SELECT * FROM user_data.users WHERE email = $1';
        const checkUserResult = await client.query(checkUserQuery, [email]);

        if (checkUserResult.rows.length > 0) {
            client.release();
            return res.status(409).send("exist"); // User already exists
        }

        const insertUserQuery = `
            INSERT INTO user_data.users (name, username, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const insertedUser = await client.query(insertUserQuery, [name, username, email, password]);

        client.release(); // Release the client back to the pool

        res.status(201).send("notexist"); // User created successfully
    } catch (error) {
        console.error('Error while signing up:', error);
        res.status(500).send("Error while signing up");
    }
});

// Enable CORS middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

app.post("/api/resend-email", async (req, res) => {
    const { email } = req.body;

    try {
        const response = await axios.post("https://api.resend.com/emails", {
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Verification Email",
            html: "<strong>Click the link to verify your email</strong>",
        });

        res.json(response.data);
    } catch (error) {
        console.error("Error sending verification email:", error.message);
        res.status(500).json({ error: "Failed to resend verification email" });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
