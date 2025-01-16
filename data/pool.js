require('dotenv').config();
const { Pool } = require("pg");

const dbUrl = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

module.exports = new Pool({
  connectionString: dbUrl,
});