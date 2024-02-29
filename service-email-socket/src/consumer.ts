import { Kafka } from "kafkajs";
import { sendMail } from "./email";
const kafka = new Kafka({
    clientId: "send-email",
    brokers: ["localhost:29092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });
export const listen = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "send-email", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            sendMail(message.value?.toString());
        },
    });
}