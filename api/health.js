const { ok, notFound } = require('../lib/response');

module.exports = (req, res) => {
  if (req.method !== 'GET') {
    return notFound(res);
  }

  ok(res, {
    status: 'OK',
    uptime: process.uptime()
  });
};
