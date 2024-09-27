// src/models/Tasker.js
const db = require("../config/database");

class Tasker {
  static async create(userId, skills, hourlyRate, bio) {
    const query = `
      INSERT INTO taskers(user_id, skills, hourly_rate, bio)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [userId, skills, hourlyRate, bio];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = "SELECT * FROM taskers WHERE user_id = $1";
    const result = await db.query(query, [userId]);
    return result.rows[0];
  }

  static async update(userId, skills, hourlyRate, bio) {
    const query = `
      UPDATE taskers
      SET skills = $2, hourly_rate = $3, bio = $4
      WHERE user_id = $1
      RETURNING *
    `;
    const values = [userId, skills, hourlyRate, bio];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findAll() {
    const query = "SELECT * FROM taskers";
    const result = await db.query(query);
    return result.rows;
  }
}

module.exports = Tasker;
