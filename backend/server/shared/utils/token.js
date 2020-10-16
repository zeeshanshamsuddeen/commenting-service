const jwt = require('jsonwebtoken');

const generate = (tokenData, secret, issuer, audience = '', expiresIn = '1d') => jwt.sign(tokenData, secret, { issuer, audience, expiresIn });

const validate = (token, jwtSecret, issuer, audience) => new Promise((resolve) => {
  jwt.verify(token, jwtSecret, { issuer, audience }, (err) => {
    if (err) {
      resolve(false);
    } else {
      resolve(true);
    }
  });
});

module.exports = {
  generate,
  verifyToken: validate,
};
