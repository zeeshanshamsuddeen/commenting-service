const utils = require('../shared/utils');
const config = require('../config');

module.exports = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;
  if (authorizationHeader) {
    ([, token] = authorizationHeader.split(' '));
  }

  try {
    if (!token) {
      return res.status(403).json({ error: 'No token provided' });
    }

    const { tokens: { webUser: { secret, issuer, audience } } } = config;
    const verifiedToken = await utils.token.verifyToken(token, secret, issuer, audience);
    if (!verifiedToken) {
      return res.status(403).json({ error: 'Invalid Token' });
    }

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Failed to authenticate' });
  }
};
