"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = (0, express_1["default"])();
app.use(express_1["default"].static(path_1["default"].join(__dirname, "/build")));
var PORT = process.env.REACT_APP_PORT;
app.listen(PORT);
console.log("app listening on port 3000");
