require('dotenv').config();
const { Client } = require("pg");

const dbUrl =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    user_name TEXT NOT NULL,
    added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`;

const insertMessages = `
INSERT INTO messages (text, user_name, added) 
VALUES 
  ('Hi there!', 'Amando', NOW()),
  ('Hello World!', 'Charles', NOW());
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: dbUrl,
  });
  
  try {
    await client.connect();
    await client.query(SQL);  // Create table if it doesn't exist
    const result = await client.query('SELECT COUNT(*) FROM messages');  // Check if the table has any rows
    const count = parseInt(result.rows[0].count, 10);  // Ensure count is an integer
    
    if (count === 0) {
      console.log('Inserting default values...');
      await client.query(insertMessages);  // Insert default values
    } else {
      console.log('Table already contains data. Skipping insertion.');
    }
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await client.end();
    console.log("done");
  }
}

main();
