const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

const getUUID = () => uuidv4();

const hashPassword = (password) => bcrypt.hashSync(password, 10);

const checkPassword = (password, passwordDigest) => bcrypt.compareSync(password, passwordDigest);

const checkObjectHasKey = (object, key) => key in object;

const runFunctionsInParallel = async (arrayOfFunctions) => Promise.all(arrayOfFunctions)
  .then((results) => ({ success: true, results }))
  .catch((errors) => ({ success: false, errors }));

module.exports = {
  getUUID,
  hashPassword,
  checkPassword,
  checkObjectHasKey,
  runFunctionsInParallel,
};
