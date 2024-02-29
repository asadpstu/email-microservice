import express from 'express';
import http from 'http';
import { Server } from 'socket.io'; 
import { listen } from './consumer';
import dotenv from 'dotenv';
import cors from 'cors'; 

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(cors());

const server = http.createServer(app); 
export const io = new Server(server); 

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('EMAIL_SENT_CONFIRM',(message)=>{
    io.emit('EMAIL_SENT', message)
  })
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/email-delivery-service', async (req, res) => {
  res.send('Email delivery service is up and running.');
});

server.listen(port, async () => {
  listen().catch(console.error)
  console.log(`Service B listening at http://localhost:${port}`);
});
