import { Kafka } from "kafkajs";
import { logger } from "./logger";
import dotenv from 'dotenv';
dotenv.config();

const kafka = new Kafka({
    clientId: `${process.env.CLIENT_ID}`,
    brokers: [`${process.env.BROKER_URL}`],
});

export const producer = kafka.producer({
    maxInFlightRequests: 1,
    idempotent: true,
    transactionalId: Date.now().toString(),
});


export async function sendPayload(input: string) {
    try {
        await producer.send({
            topic: `${process.env.TOPIC}`,
            messages: [{ key: `${process.env.TOPIC_KEY}`, value: input }],
        });
    } catch (e) {
        logger.info(`Error sending messages ${e}`);
        throw new Error(`Error sending messages ${e}` )
    }
}
