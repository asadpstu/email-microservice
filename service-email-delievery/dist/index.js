"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const consumer_1 = require("./consumer");
const app = (0, express_1.default)();
const port = 3002;
app.get('/email-delievery-service', (req, res) => {
    res.send('Email delievry service is up and running.');
});
app.listen(port, () => {
    (0, consumer_1.run)().catch(console.error);
    console.log(`Service B listening at http://localhost:${port}`);
});
