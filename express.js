// Load environment variables from .env file
require('dotenv').config();

// Run app.js (to create database schema and table)
require('./app');

// Run server.js (to start the Express server)
require('./server');

