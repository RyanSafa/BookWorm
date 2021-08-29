function apiErrorHandler(err, req, res, next) {
  const { statusCode = 400 } = err;
  console.log(err);
  if (!err.message) err.message = "Oh no, something went wrong!";
  res.status(statusCode).send(err.message);
}

export default apiErrorHandler;
