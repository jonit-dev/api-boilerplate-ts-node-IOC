import { MongooseQueryParser } from "mongoose-query-parser";
export const mongooseQueryParserMiddleware = (req, res, next): any => {
  const parser = new MongooseQueryParser();
  const parsedQuery = parser.parse(req.query);

  req.query = parsedQuery;

  next();
};
