const { comments } = require('../services');

const getComments = async (req, res) => {
  const { level } = req.query; // commentID can be also used to query sub-comments
  const queryObject = { level };
  const commentsResult = await comments.getComments(queryObject);
  return res.json({ success: true, comments: commentsResult.comments });
};

const editComment = async (req, res) => {
  const { id: commentID } = req.params;
  const { username, userID } = req;
  const contextObject = { username, userID };
  const updateResponse = await comments.editComment(contextObject, commentID);
  if (!updateResponse.success) {
    return res.json({ success: false, error: updateResponse.error });
  }
  return res.json({ success: true });
};

const addComment = async (req, res) => {
  const { username, userID } = req;
  console.log('username, userID: ', username, userID);
  const contextObject = { username, userID };
  const { success, error } = await comments.addComment(contextObject, req.body);
  if (!success) {
    return res.status(401).json({ success: false, error });
  }
  return res.json({ success: true });
};

module.exports = {
  getComments,
  editComment,
  addComment,
};
