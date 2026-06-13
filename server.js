const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 8080;
const apiTarget = process.env.API_TARGET || 'http://127.0.0.1:3000';

app.use('/api', createProxyMiddleware({
  target: apiTarget,
  changeOrigin: true,
  pathRewrite: { '^/api': '' }
}));

app.use(express.static(path.join(__dirname)));

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Frontend server running at http://localhost:${port}`);
  console.log(`Proxying /api/* to ${apiTarget}`);
});
