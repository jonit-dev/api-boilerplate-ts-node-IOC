export const errorHandlerMiddleware = function (err, req, res, next): any {
  console.log("PEGOU NO MIDDLEWARE");

  console.log(err.stack);

  if (err.statusCode) {
    return res.status(err.statusCode).send(err);
  }

  next();
};
