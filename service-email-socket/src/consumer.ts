import { Kafka } from "kafkajs";
import { sendMail } from "./email";
import dotenv from 'dotenv';
dotenv.config();

const kafka = new Kafka({
    clientId: `${process.env.CLIENT_ID}`,
    brokers: [`${process.env.BROKER_URL}`],
});

const consumer = kafka.consumer({ groupId: `${process.env.GROUP_ID}` });
export const listen = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: `${process.env.TOPIC}`, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            sendMail(message.value?.toString());
        },
    });
}