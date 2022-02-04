import "reflect-metadata"; //! this must be always first
import "dotenv/config";
import "express-async-errors";

import cors from "cors";
import express from "express";
import { getRouteInfo, InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import * as prettyjson from "prettyjson";
import { container, serverHelper } from "./providers/inversify/container";
import { errorHandlerMiddleware } from "./providers/middlewares/ErrorHandlerMiddleware";

const port = process.env.PORT || 5000;

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  // Middlewares ========================================
  app.use(cors());
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(express.static("public"));
  app.use(errorHandlerMiddleware);

  serverHelper.showBootstrapMessage({ env: process.env.ENV, port: Number(port) });
});

const app = server.build();
app.listen(port);

if (process.argv.includes("--show-routes")) {
  const routeInfo = getRouteInfo(container);
  console.log(prettyjson.render({ routes: routeInfo }));
}
