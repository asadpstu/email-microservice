import express, { Request, Response } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { producer, sendPayload } from './kafaka/producer';
import { logger } from './logger';

dotenv.config();
const app: express.Application = express();
const port: number | string = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.get('/heartbit', async (req: Request, res: Response) => {
  res.status(200).send("Payload service is up.");
});

app.post('/email-payload-service', (req: Request, res: Response) => {
  logger.info(`Payload received: ${JSON.stringify(req.body)}`);
  sendPayload(JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(port, async () => {
  await producer.connect();
  console.log(`Email payload service is listening at http://localhost:${port}`);
});
