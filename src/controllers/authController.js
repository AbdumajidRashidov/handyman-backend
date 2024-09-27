const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    const { phoneNumber, firstName, lastName, email, password } = req.body;
    const user = await authService.registerUser(
      phoneNumber,
      firstName,
      lastName,
      email,
      password
    );
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;
    const token = await authService.loginUser(phoneNumber, password);
    res.json({ token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
