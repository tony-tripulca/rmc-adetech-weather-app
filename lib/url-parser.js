function urlParser(req) {
  // req.url is a path, so we need a base
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

  const parts = parsedUrl.pathname.split('/').filter(Boolean);
  // expected: ['api', '<resource>', '<action>']

  if (parts[0] !== 'api') {
    return { error: 'Invalid API base path' };
  }

  if (parts.length < 3) {
    return { error: 'Resource and action are required' };
  }

  // Convert URLSearchParams → plain object
  const query = Object.fromEntries(parsedUrl.searchParams.entries());

  return {
    resource: parts[1],
    action: parts[2],
    query
  };
}

module.exports = {
  urlParser
};
