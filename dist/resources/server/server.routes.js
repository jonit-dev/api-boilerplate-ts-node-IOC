"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverRouter = void 0;
var express_1 = __importDefault(require("express"));
var serverRouter = express_1.default.Router();
exports.serverRouter = serverRouter;
serverRouter.get("/", function (req, res) {
    res.send("Welcome to the server!");
});
