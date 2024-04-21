const jwt = require("jsonwebtoken");
const { authenticateError } = require("../../utils/error");

const tokenGenerator = async (payload) => {
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });

  return token;
};

const tokenValidator = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    return decoded;
  } catch (err) {
    throw authenticateError("Invalid or expired token. Please log in again.");
  }
};

module.exports = { tokenGenerator, tokenValidator };