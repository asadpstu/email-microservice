const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 4000;

const {
  SERVICE_EMAIL_PAYLOAD_API_URL,
  SERVICE_EMAIL_DELIEVERY_API_URL,
} = require('./URLs');

const emailPayloadService = {
  target: SERVICE_EMAIL_PAYLOAD_API_URL,
  changeOrigin: true, 
  logger: console,
};

const emailDelieveryService = {
  target: SERVICE_EMAIL_DELIEVERY_API_URL,
  changeOrigin: true, 
  logger: console,
};

const emailPayloadProxy = createProxyMiddleware(emailPayloadService);
const emailDelieveryProxy = createProxyMiddleware(emailDelieveryService);

app.get('/', (req, res) => res.send('Api Gateway is up and running'));
app.post('/email-payload-service', emailPayloadProxy);
app.get('/email-delievery-service', emailDelieveryProxy);

app.listen(port, () => console.log(`Api Gateway listening on port ${port}!`));