const config = require('../config');
const utils = require('../shared/utils');
const db = require('../db/dbModule');

const generateToken = (userID, username) => {
  const tokenData = { userID, username };
  const { secret, issuer, audience } = config.tokens.webUser;
  return utils.token.generate(tokenData, secret, issuer, audience);
};

const login = async (loginDetails) => {
  const { email, password } = loginDetails;
  const accountFromDB = await db.accounts.findOneWithLean({ email });
  if (!accountFromDB) {
    return { success: false, error: 'Incorrect Password/Email' };
  }
  const { passwordDigest, userID, username } = accountFromDB;
  if (!utils.common.checkPassword(password, passwordDigest)) {
    return { success: false, error: 'Incorrect Password/Email' };
  }
  return { success: true, userID, username };
};

module.exports = {
  login,
  generateToken,
};
