function generateErrorData(properties = {}) {
  const data = Object.entries(properties)
    .filter(([key, value]) => !value)
    .map(([key]) => ({ field: key, message: `${key} is required` }));

  return data;
}

const generateBadRequestError = ({ properties = {}, msg = "Bad request." } = {}) => {
  const error = new Error(msg);
  error.status = 400;
  error.data = generateErrorData({ ...properties });

  return error;
};

const authenticateError = (msg = "Unauthorized") => {
  const error = new Error(msg);
  error.status = 401;
  return error;
};

const forbiddenError = (msg = "You are not allowr for this route!") => {
  const error = new Error(msg);
  error.status = 403;
  return error;
};

const notFoundError = (msg = "Resource not found!") => {
  const error = new Error(msg);
  error.status = 404;
  return error;
};

module.exports = {
  generateBadRequestError,
  authenticateError,
  forbiddenError,
  notFoundError,
};
