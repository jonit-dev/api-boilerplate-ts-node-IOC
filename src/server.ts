import express from "express";

import { serverRouter } from "./resources/server/server.routes";

const app = express();

const port = process.env.PORT || 5000;

// Middlewares ========================================

app.use(serverRouter);

const server = app.listen(port, () => {
  console.log(`⚙️ Server running on port ${port}`);
});
