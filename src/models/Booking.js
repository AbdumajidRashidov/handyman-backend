// src/models/Booking.js
const db = require("../config/database");

class Booking {
  static async create(
    taskId,
    taskerId,
    userId,
    status = "pending",
    paymentStatus = "pending"
  ) {
    const query = `
      INSERT INTO bookings(task_id, tasker_id, user_id, status, payment_status)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [taskId, taskerId, userId, status, paymentStatus];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findById(id) {
    const query = "SELECT * FROM bookings WHERE id = $1";
    const result = await db.query(query, [id]);
    return result.rows[0];
  }

  static async updateStatus(id, status) {
    const query = "UPDATE bookings SET status = $2 WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id, status]);
    return result.rows[0];
  }

  static async updatePaymentStatus(id, paymentStatus) {
    const query =
      "UPDATE bookings SET payment_status = $2 WHERE id = $1 RETURNING *";
    const result = await db.query(query, [id, paymentStatus]);
    return result.rows[0];
  }
}

module.exports = Booking;
