import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { save } from './record';
import {io} from 'socket.io-client';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

export const sendMail = (payload: string | undefined) =>{
    if (!payload) {
        console.error("No message value provided.");
        return;
    }
    try {
        const jsonObject : { receiver : string, subject: string, body: string } = JSON.parse(payload);
        const mailOptions = {
            from: process.env.EMAIL,
            to: jsonObject.receiver,
            subject: jsonObject.subject,
            text: jsonObject.body,
        };
        
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.error('Email sending failed:', error);
            } else {
                console.log('Email sent: ' + info.response);
                await save({
                    to: jsonObject.receiver,
                    subject: jsonObject.subject,
                    text: jsonObject.body, 
                })
                
                const socket = io('http://localhost:3002',{
                    transports: ['websocket']
                 });
                  socket.on("connect", () => {
                    socket.emit('EMAIL_SENT_CONFIRM', 'Email sent successfully.')
                  })

            }
        }); 

    } catch (error) {
        console.error("Error parsing JSON:", error);
    }
}