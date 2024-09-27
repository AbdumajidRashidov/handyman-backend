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

  static async search(
    criteria,
    page = 1,
    limit = 10,
    sortBy = "created_at",
    sortOrder = "DESC"
  ) {
    let query = "SELECT * FROM taskers WHERE 1=1";
    const values = [];
    let valueIndex = 1;

    if (criteria.skills && criteria.skills.length > 0) {
      query += ` AND skills && $${valueIndex++}`;
      values.push(criteria.skills);
    }

    if (criteria.minHourlyRate) {
      query += ` AND hourly_rate >= $${valueIndex++}`;
      values.push(criteria.minHourlyRate);
    }

    if (criteria.maxHourlyRate) {
      query += ` AND hourly_rate <= $${valueIndex++}`;
      values.push(criteria.maxHourlyRate);
    }

    if (criteria.minRating) {
      query += ` AND rating >= $${valueIndex++}`;
      values.push(criteria.minRating);
    }

    query += ` ORDER BY ${sortBy} ${sortOrder}`;
    query += ` LIMIT $${valueIndex++} OFFSET $${valueIndex}`;
    values.push(limit, (page - 1) * limit);

    const result = await db.query(query, values);
    return result.rows;
  }
}

module.exports = Tasker;
