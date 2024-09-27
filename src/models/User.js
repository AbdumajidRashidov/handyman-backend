const db = require("../config/database");

class User {
  static async create(phoneNumber, firstName, lastName, email, password) {
    const query =
      "INSERT INTO users(phone_number, first_name, last_name, email, password) VALUES($1, $2, $3, $4, $5) RETURNING *";
    const values = [phoneNumber, firstName, lastName, email, password];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByPhoneNumber(phoneNumber) {
    const query = "SELECT * FROM users WHERE phone_number = $1";
    const result = await db.query(query, [phoneNumber]);
    return result.rows[0];
  }
}

module.exports = User;
