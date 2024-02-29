import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { producer, sendPayload } from './kafka';
import { logger } from './logger';

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.get('/heartbit', async (req, res) => {
  res.sendStatus(200).send("Payload delievery service is up.");
});

app.post('/email-payload-service', (req, res) => {
  logger.info(`Payload received: ${JSON.stringify(req.body)}`);
  sendPayload(JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(port, async() => {
  await producer.connect();
  console.log(`Service A listening at http://localhost:${port}`);
});
