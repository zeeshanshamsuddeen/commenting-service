const mongoose = require('mongoose');

const { Schema } = mongoose;

const initSchema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  userID: { type: String, required: true },
  passwordDigest: { type: String, default: undefined },
}, { timestamps: true });

module.exports = mongoose.model('accounts', initSchema);
