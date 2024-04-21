const { tokenValidator } = require("../lib/auth");
const { authenticateError } = require("../utils/error");

const auth = async (req, _res, next) => {
  try {
    if (!req.headers.authorization) {

      throw authenticateError(
        "Authorization header is missing. Please include a valid token."
      );
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = await tokenValidator(token);

    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
