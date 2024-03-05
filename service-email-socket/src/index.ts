import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import { listen } from './kafka/consumer';
import dotenv from 'dotenv';
import cors from 'cors';
import { getAllStatus } from './controller/query';
import { initializeSocketIO } from './socket.io/socket';

dotenv.config();
const app: express.Application = express();
const port: number | string = process.env.PORT || 3002;

app.use(cors());

const server: http.Server = http.createServer(app);
const io: Server = new Server(server);
initializeSocketIO(io);

app.get('/heartbit', async (req: Request, res: Response) => {
  res.status(200).send("Email delivery service is up.");
});

app.get('/email-delievery-service', async (req: Request, res: Response) => {
  const data: any = await getAllStatus();
  res.status(200).send(data);
});

server.listen(port, async () => {
  listen().catch(console.error);
  console.log(`Email delivery service is listening at http://localhost:${port}`);
});
