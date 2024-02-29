import express from 'express';
import http from 'http';
import { Server } from 'socket.io'; 
import { listen } from './consumer';
import dotenv from 'dotenv';
import cors from 'cors'; 
import { getAllStatus } from './record';

dotenv.config();
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());

const server = http.createServer(app); 
export const io = new Server(server); 

io.on('connection', (socket) => {
  socket.on('EMAIL_SENT_CONFIRM',(message)=>{
    io.emit('EMAIL_SENT', message)
  })
  socket.on('NEW_REQUEST',(message)=>{
    io.emit('NEW_REQUEST_SAVED', message)
  })
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/heartbit', async (req, res) => {
  res.sendStatus(200).send("Email delievery service is up.");
});

app.get('/email-delievery-service', async (req, res) => {
  const data = await getAllStatus();
  res.status(200).send(data);
});

server.listen(port, async () => {
  listen().catch(console.error)
  console.log(`Email delievery service is listening at http://localhost:${port}`);
});
