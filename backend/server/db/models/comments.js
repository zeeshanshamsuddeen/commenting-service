const mongoose = require('mongoose');

const { Schema } = mongoose;

const initSchema = new Schema({
  commentID: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  text: { type: String, required: true },
  parentID: { type: String },
  userID: { type: String, required: true },
  author: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('comments', initSchema);
