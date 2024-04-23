const { forbiddenError } = require("../utils/error");

const authorize = (roles = ["admin"]) => (req, _res, next) => {
  if (roles.includes(req.user.role)) {
    return next();
  }

  // Use forbiddenError with a custom message
  return next(forbiddenError("You are not allowed to access this route."));
}

module.exports = authorize;