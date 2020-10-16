const { accounts } = require('../services');

const login = async (req, res) => {
  const { success, error, userId } = await accounts.login(req.body);
  if (!success) {
    return res.status(401).json({ success: false, error });
  }
  const token = accounts.generateToken(userId);
  return res.json({ success: true, userId, token });
};

module.exports = {
  login,
};
