import { Kafka } from "kafkajs";
const kafka = new Kafka({
    clientId: "send-email",
    brokers: ["localhost:29092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });
export const listen = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: "send-email", fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("Received: ", {
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });
        },
    });
}