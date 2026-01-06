const http = require('http');
const { notFound } = require('./lib/response');

// map routes to handlers
const routes = {
  '/api/health': require('./api/health')
};

const router = http.createServer((req, res) => {
  const handler = routes[req.url];

  if (!handler) {
    return notFound(res);
  }

  handler(req, res);
});

module.exports = router;
