export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  statusCode = statusCode || 500;
  message = message || "Internal server error";
  console.log(err || "Internal server error")
  res.status(statusCode).json({
    status: err.status || "error",
    message,
  });
};
