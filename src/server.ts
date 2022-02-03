import express from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import morgan from "morgan";
import "reflect-metadata"; //! this must be always first
import { container } from "./providers/inversify/container";

const port = process.env.PORT || 5000;

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  // Middlewares ========================================
  app.use(express.json());
  app.use(morgan("dev"));
});

let app = server.build();
app.listen(port);
