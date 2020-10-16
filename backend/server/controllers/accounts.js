const { accounts } = require('../services');

const login = async (req, res) => {
  const { success, error, userID, username } = await accounts.login(req.body);
  if (!success) {
    return res.status(401).json({ success: false, error });
  }
  const token = accounts.generateToken(userID, username);
  return res.json({ success: true, userID, token });
};

module.exports = {
  login,
};
