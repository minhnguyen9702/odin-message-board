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
);

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
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
