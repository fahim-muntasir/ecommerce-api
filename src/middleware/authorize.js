const authorize = (roles = ["admin"]) => (req, _res, next) => {
next();
}

module.exports = authorize;