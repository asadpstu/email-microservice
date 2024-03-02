import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { listen } from './kafka/consumer';
import dotenv from 'dotenv';
import cors from 'cors';
import { getAllStatus } from './controller/query';

dotenv.config();
const app: express.Application = express();
const port: number | string = process.env.PORT || 3002;

app.use(cors());

const server: http.Server = http.createServer(app);
export const io: Server = new Server(server);

io.on('connection', (socket: Socket) => {
  socket.on('EMAIL_SENT_CONFIRM', (message: string) => {
    io.emit('EMAIL_SENT', message);
  });
  socket.on('NEW_REQUEST', (message: string) => {
    io.emit('NEW_REQUEST_SAVED', message);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.get('/heartbit', async (req: Request, res: Response) => {
  res.status(200).send("Email delivery service is up.");
});

app.get('/email-delivery-service', async (req: Request, res: Response) => {
  const data: any = await getAllStatus();
  res.status(200).send(data);
});

server.listen(port, async () => {
  listen().catch(console.error);
  console.log(`Email delivery service is listening at http://localhost:${port}`);
});
