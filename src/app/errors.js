const notfoundError = (_req, _res, next) => {
  const error = new Error("Resource not found!");
  error.status = 404;

  next(error);
};

const globalError = (error, _req, res, _next) => {
  // mongoose validation error response
  if (error.name === "ValidationError") {
    const validationErrors = Object.entries(error.errors).map(
      ([key, value]) => ({ field: key, message: value.properties?.message })
    );

    return res.status(400).json({
      code: 400,
      error: "Validation Error",
      data: validationErrors,
    });
  }

  // other error response
  if (error.status) {
    return res.status(error.status).json({
      code: error.status,
      error: error.message,
      data: error.data || [],
    });
  }

  // 500 error response
  res.status(500).json({
    code: 500,
    error: "Something went wrong!",
  });
};

module.exports = {
  globalError,
  notfoundError,
};
