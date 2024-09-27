const db = require("../config/database");

class Task {
  static async create(
    title,
    description,
    category,
    location,
    budget,
    currency,
    dueDate,
    userId
  ) {
    const query = `
      INSERT INTO tasks(title, description, category, location, budget, currency, due_date, user_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const values = [
      title,
      description,
      category,
      location,
      budget,
      currency,
      dueDate,
      userId,
    ];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = "SELECT * FROM tasks WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = "SELECT * FROM tasks WHERE user_id = $1";
    const result = await db.query(query, [userId]);
    return result.rows;
  }
}

module.exports = Task;
