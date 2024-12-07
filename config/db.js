const { Sequelize } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Initialize Sequelize with database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database username
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST,   // Database host (e.g., localhost)
    dialect: process.env.DB_DIALECT, // Dialect (e.g., mysql, postgres)
    logging: false,         // Disable logging for cleaner output
  }
);

// Test database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Exit process on database connection failure
  }
};

module.exports = { sequelize, connectDB };
