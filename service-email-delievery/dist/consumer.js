"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: "send-email",
    brokers: ["localhost:29092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({ topic: "send-email", fromBeginning: true });
    yield consumer.run({
        eachMessage: ({ topic, partition, message }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            console.log("Received: ", {
                partition,
                offset: message.offset,
                value: (_a = message.value) === null || _a === void 0 ? void 0 : _a.toString(),
            });
        }),
    });
});
exports.run = run;
