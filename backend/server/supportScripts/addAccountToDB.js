require('../initiateEnv');
require('../db/dbConnector');

const db = require('../db/dbModule');
const utils = require('../shared/utils');

(async () => {
  const password = 'qwerty123!';
  const account1 = {
    email: 'john@test.com',
    username: 'john',
    userID: utils.common.getUUID(),
    passwordDigest: utils.common.hashPassword(password),
  };
  await db.accounts.addOne(account1);
  const account2 = {
    email: 'david@test.com',
    username: 'david',
    userID: utils.common.getUUID(),
    passwordDigest: utils.common.hashPassword(password),
  };
  await db.accounts.addOne(account2);
  process.exit();
})();
