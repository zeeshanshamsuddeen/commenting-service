/* eslint-disable no-await-in-loop */
const utils = require('../shared/utils');
const db = require('../db/dbModule');
const { keywords } = require('../constants');

const getSubComments = async ({ parentID }) => {
  const queryObject = {};
  queryObject.parentID = parentID;
  const comments = await db.comments.findWithLean(queryObject);
  for (let i = 0; i < comments.length; i += 1) {
    comments[i].children = await getSubComments({ parentID: comments[i].commentID });
  }
  return comments;
};

const getComments = async () => {
  const comments = await getSubComments({ parentID: null });
  return { comments };
};

const editComment = async (contextObject, commentID, updateObject) => {
  const { username, userID } = contextObject;
  const commentFromDb = await db.comments.findOneWithLean({ commentID });
  if (!commentFromDb) {
    return { success: false, error: 'Comment Not Found' };
  }
  if (commentFromDb.userID !== userID) {
    return { success: false, error: 'Not authorized' };
  }
  const dbUpdateObject = { text: updateObject.text };
  await db.comments.findOneAndUpdate({ commentID }, dbUpdateObject);
  return { success: true };
};

const addComment = async (contextObject, { parentID, text }) => {
  const { username, userID } = contextObject;
  const initObject = {
    commentID: utils.common.getUUID(),
    text,
    status: keywords.ACTIVE,
    author: username,
    userID,
    parentID: null,
  };
  if (parentID) {
    initObject.parentID = parentID;
  }
  await db.comments.addOne(initObject);
  return { success: true };
};

module.exports = {
  getComments,
  addComment,
  editComment,
};
