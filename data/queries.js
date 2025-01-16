const pool = require("./pool");

async function getAllMessages() {
  const query = `SELECT * FROM messages`;
  const { rows } = await pool.query(query);
  return rows;
}

async function insertMessage(text, user_name, added = new Date()) {
  const query = `
    INSERT INTO messages (text, user_name, added)
    VALUES ($1, $2, $3)
    `;
  await pool.query(query, [text, user_name, added]);
}

module.exports = {
  getAllMessages,
  insertMessage,
};
