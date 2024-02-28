import express from 'express';

const app = express();
const port = process.env.PORT;

app.get('/socket-service', (req, res) => {
  res.send('Socket.io service is up and running.');
});

app.listen(port, () => {
  console.log(`Service B listening at http://localhost:${port}`);
});