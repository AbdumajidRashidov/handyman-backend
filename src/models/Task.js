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

  static async search(
    criteria,
    page = 1,
    limit = 10,
    sortBy = "created_at",
    sortOrder = "DESC"
  ) {
    let query = "SELECT * FROM tasks WHERE 1=1";
    const values = [];
    let valueIndex = 1;

    if (criteria.category) {
      query += ` AND category = $${valueIndex++}`;
      values.push(criteria.category);
    }

    if (criteria.minBudget) {
      query += ` AND budget >= $${valueIndex++}`;
      values.push(criteria.minBudget);
    }

    if (criteria.maxBudget) {
      query += ` AND budget <= $${valueIndex++}`;
      values.push(criteria.maxBudget);
    }

    if (criteria.location) {
      // Assuming location is stored as a point in PostgreSQL
      query += ` AND ST_DWithin(location, ST_SetSRID(ST_MakePoint($${valueIndex}, $${
        valueIndex + 1
      }), 4326), $${valueIndex + 2})`;
      values.push(
        criteria.location.longitude,
        criteria.location.latitude,
        criteria.location.radius
      );
      valueIndex += 3;
    }

    query += ` ORDER BY ${sortBy} ${sortOrder}`;
    query += ` LIMIT $${valueIndex++} OFFSET $${valueIndex}`;
    values.push(limit, (page - 1) * limit);

    const result = await db.query(query, values);
    return result.rows;
  }
}

module.exports = Task;
