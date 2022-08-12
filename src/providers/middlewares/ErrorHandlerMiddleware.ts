export const errorHandlerMiddleware = function (err, req, res, next): any {
  if (err.statusCode) {
    console.log(err.stack);
    return res.status(err.statusCode).send(err);
  }

  next();
};
