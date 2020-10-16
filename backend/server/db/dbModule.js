const commentsModel = require('./models/comments');
const accountsModel = require('./models/accounts');

const dbFunctions = require('./dbFunctions');

const requiredDbFunctions = [
  'findOneAndUpdate',
  'addOne',
  'add',
  'findOne',
  'findOneWithLean',
  'find',
  'findWithSkipLimitLean',
  'count',
  'findWithLean',
  'remove',
  'findAndUpdate',
  'aggregate',
];

const comments = {};
const accounts = {};

const createDbFunctions = () => {
  requiredDbFunctions.forEach((requiredFunc) => {
    comments[requiredFunc] = (...args) => dbFunctions[requiredFunc](commentsModel, ...args);
    accounts[requiredFunc] = (...args) => dbFunctions[requiredFunc](
      accountsModel, ...args,
    );
  });
};

createDbFunctions();

const db = {
  comments,
  accounts,
};

module.exports = db;
