import express from 'express';
import { listen } from './consumer';

const app = express();
const port = process.env.PORT || 3002;

app.get('/email-delievery-service', (req, res) => {
  res.send('Email delievery service is up and running.');
});

app.listen(port, () => {
  listen().catch(console.error)
  console.log(`Service B listening at http://localhost:${port}`);
});