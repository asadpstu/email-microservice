import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: "send-email",
    brokers: ["localhost:29092"],
});

export const producer = kafka.producer({
    maxInFlightRequests: 1,
    idempotent: true,
    transactionalId: "uniqueProducerId",
});


export async function sendPayload(input: string) {
    try {
        await producer.send({
            topic: "send-email",
            messages: [{ key: "send-email", value: input }],
        });
    } catch (e) {
        console.error("Caught Error while sending:", e);
    }
}