import express from 'express';

const app = express();
const port = 3001;

app.get('/email-payload-service', (req, res) => {
  res.send('Email payload service is up and running.');
});

app.listen(port, () => {
  console.log(`Service A listening at http://localhost:${port}`);
});