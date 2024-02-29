import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { save, updateStatusById } from './record';
import {io} from 'socket.io-client';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export const sendMail = async (payload: string | undefined) =>{
    if (!payload) {
        console.error("No message value provided.");
        return;
    }
    try {
        const socket = io(`${process.env.WEBSOCKET_URL}`,{transports: ['websocket']});
        const jsonObject : { receiver : string, subject: string, body: string } = JSON.parse(payload);
        const mailOptions = {
            from: process.env.EMAIL,
            to: jsonObject.receiver,
            subject: jsonObject.subject,
            text: jsonObject.body,
        };

        socket.on("connect", async () => {
            const createdId = await save({
                to: jsonObject.receiver,
                subject: jsonObject.subject,
                text: jsonObject.body, 
            })
            socket.emit('NEW_REQUEST', 'Payload stored into database.')
            transporter.sendMail(mailOptions, async (error, info) => {
                if (error) {
                    console.error('Email sending failed:', error);
                } else {
                    await updateStatusById(createdId);
                    socket.emit('EMAIL_SENT_CONFIRM', 'Email sent successfully.')
                }
            });
          })
    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
}