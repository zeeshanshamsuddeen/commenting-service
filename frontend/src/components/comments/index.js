import React, { Component, Fragment } from "react";
import "./index.css";
import { getComments, addComment, editComment } from "../../actions/comments";
import { getUserID } from "../../actions/auth";
import Header from '../header';

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      mainText: '',
      subText: '',
      userID: getUserID(),
      editingCommentID: '',
      replyingParentID: '',
    }
  }

  componentDidMount = () => {
    this.fetchComments();
  }

  resetFields = () => {
    this.setState({
      mainText: '',
      subText: '',
      editingCommentID: '',
      replyingParentID: '',
    });
  }

  fetchComments = async () => {
    const commentsResponse = await getComments();
    if (commentsResponse.data && commentsResponse.data.success) {
      this.setState({ comments: commentsResponse.data.comments });
    }
  }

  onChangeMainText = (e) => {
    this.setState({ mainText: e.target.value });
  }

  onChangeSubText = (e) => {
    this.setState({ subText: e.target.value });
  }

  onClickAddComment = async () => {
    const { mainText } = this.state;
    if (!mainText) {
      alert('Invalid Comment');
      return;
    };
    const initObject = { text: mainText };
    await addComment(initObject);
    this.resetFields();
    this.fetchComments();
  }


  onClickReplySave = async () => {
    const { subText, replyingParentID } = this.state;
    if (!subText) {
      alert('Invalid Reply');
      return;
    };
    const initObject = {
      text: subText,
      parentID: replyingParentID,
    };
    await addComment(initObject);
    this.resetFields();
    this.fetchComments();
  }

  onClickEditSave = async () => {
    const { subText, editingCommentID } = this.state;
    if (!subText) {
      alert('Invalid Comment');
      return;
    };
    const initObject = { text: subText };
    await editComment(editingCommentID, initObject);
    this.resetFields();
    this.fetchComments();
  }

  onClickEditComment = (commentID) => {
    this.resetFields();
    this.setState({ editingCommentID: commentID })
  }

  onClickCancel = () => {
    this.resetFields();
  }

  onClickReply = (commentID) => {
    this.resetFields();
    this.setState({ replyingParentID: commentID })
  }

  displayEditingComment = () => {
    const { subText } = this.state;
    return <div>
      <div className="comment">
        <input className="large mx-8" placeholder="Write your update here" onChange={this.onChangeSubText} value={subText} />
      </div>
      <button className="comment-button" onClick={this.onClickEditSave}>Save</button>
      <button className="comment-button" onClick={this.onClickCancel}>Cancel</button>
    </div>;
  }

  displayNonEditingComment = (comment) => {
    const { userID, replyingParentID, subText } = this.state;
    return <div>
      <div className="comment">
        <span>{comment.text}</span>
      </div>

      <button className="comment-button" onClick={() => this.onClickReply(comment.commentID)}>Reply</button>
      {comment.userID === userID &&
        <button className="comment-button" onClick={() => this.onClickEditComment(comment.commentID)}>Edit</button>}

      {replyingParentID === comment.commentID && <div className="px-20">
        <div className="comment">
          <input className="large mx-8" placeholder="Write your reply here" onChange={this.onChangeSubText} value={subText} />
        </div>
        <button className="comment-button" onClick={this.onClickReplySave}>Save</button>
        <button className="comment-button" onClick={this.onClickCancel}>Cancel</button>
      </div>}
    </div>
  }

  displayCommentHeader = comment => <div className="layout-row justify-content-between comment-header">
    <span>{comment.author}</span>
    <span>{new Date(comment.createdAt).toLocaleDateString("en-US")}</span>
  </div>

  displayComments = (comments) => {
    const { editingCommentID, } = this.state;
    return <div className="pl-20">
      {comments.map((comment) => <div key={comment.commentID} className="pt-10">
        {this.displayCommentHeader(comment)}
        {editingCommentID === comment.commentID
          ? this.displayEditingComment()
          : this.displayNonEditingComment(comment)
        }
        {this.displayComments(comment.children)}
      </div>)}
    </div>
  }

  render() {
    const { mainText, comments } = this.state;

    return (
      <Fragment>
        <Header />
        <div className="layout-column align-items-center justify-content-start" >
          <div className="w-40 bg-color-grey pa-30">

            <section className="layout-row align-items-center justify-content-center mb-30">
              <input className="w-60" placeholder="Write you comment here" onChange={this.onChangeMainText} value={mainText} />
              <button className="main-comment-button" onClick={this.onClickAddComment}>Add Comment</button>
            </section>

            {this.displayComments(comments)}
          </div>
        </div>
      </Fragment>
    );
  }
}


export default Comments;