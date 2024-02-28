import express from 'express';

const app = express();
const port = 3002;

app.get('/email-delievery-service', (req, res) => {
  res.send('Email delievry service is up and running.');
});

app.listen(port, () => {
  console.log(`Service B listening at http://localhost:${port}`);
});