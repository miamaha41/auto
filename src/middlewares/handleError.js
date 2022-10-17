import createError from "http-errors";
export const handleError = (req, res, next) => {
  next(createError.NotFound("This route does not exist"));
};
export const showError = (err, req, res, next) => {
  res.json({
    status: err.status || 500,
    message: err.message,
  });
};
