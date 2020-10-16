/* eslint-disable no-await-in-loop */
const utils = require('../shared/utils');
const db = require('../db/dbModule');
const { keywords } = require('../constants');

const getSubComments = async ({ parentID, level }) => {
  const queryObject = {};
  if (level) queryObject.level = level;
  if (parentID) queryObject.parentID = level;
  const comments = await db.comments.findWithLean(queryObject);
  for (let i = 0; i < comments.length; i += 1) {
    comments[i].children = await getSubComments({ parentID: comments[i].commentID });
  }
  return comments;
};

const getComments = async ({ level }) => {
  // parentID can be used here to query sub comments of a comment
  const comments = await getSubComments({ level });
  return { comments };
};

const editComment = async (commentID) => {
  const commentFromDb = await db.comments.findOneWithLean({ commentID });
  if (!commentFromDb) {
    return { success: false, error: 'Comment Not Found' };
  }
  await db.comments.findOneAndUpdate({ commentID }, { status: keywords.COMPLETED });
  return { success: true };
};

const addComment = async ({ level, commentID: parentID, text }) => {
  const initObject = {
    commentID: utils.common.getUUID(),
    text,
    level,
    status: keywords.ACTIVE,
  };
  if (parentID) initObject.parentID = parentID;
  await db.comments.addOne(initObject);
  return { success: true };
};

module.exports = {
  getComments,
  addComment,
  editComment,
};
