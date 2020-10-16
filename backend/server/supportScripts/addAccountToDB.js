require('../initiateEnv');
require('../db/dbConnector');

const db = require('../db/dbModule');
const utils = require('../shared/utils');

(async () => {
  const password = 'qwerty123!';
  const account = {
    email: 'test@test.com',
    userId: utils.common.getUUID(),
    passwordDigest: utils.common.hashPassword(password),
  };
  await db.accounts.addOne(account);
  process.exit();
})();
