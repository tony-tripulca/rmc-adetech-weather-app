const http = require('http');
const { notFound, badRequest } = require('./lib/response');
const { urlParser } = require('./lib/url-parser');

// map resources to handlers
const routes = {
  users: require('./api/users')
};

const router = http.createServer((req, res) => {
  const parsed = urlParser(req);

  if (parsed.error) {
    return badRequest(res, parsed.error);
  }

  const { resource, action, query } = parsed;
  const handler = routes[resource];

  if (!handler) {
    return notFound(res, 'API resource not found');
  }

  // attach parsed data to req
  req.action = action;
  req.query = query;

  handler(req, res);
});

module.exports = router;
