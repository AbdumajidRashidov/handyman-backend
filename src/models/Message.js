// src/models/Message.js
class Message {
  static async create(bookingId, senderId, content) {
    const query = `
        INSERT INTO messages(booking_id, sender_id, content)
        VALUES($1, $2, $3)
        RETURNING *
      `;
    const values = [bookingId, senderId, content];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByBookingId(bookingId) {
    const query =
      "SELECT * FROM messages WHERE booking_id = $1 ORDER BY created_at ASC";
    const result = await db.query(query, [bookingId]);
    return result.rows;
  }
}

module.exports = Message;
