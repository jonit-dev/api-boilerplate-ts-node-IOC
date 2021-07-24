"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var server_routes_1 = require("./resources/server/server.routes");
var app = express_1.default();
var port = process.env.PORT || 5000;
// Middlewares ========================================
app.use(server_routes_1.serverRouter);
var server = app.listen(port, function () {
    console.log("\u2699\uFE0F Server running on port " + port);
});
