import React, { Component } from "react";
import "./index.css";
import { getComments, addComment, editComment } from "../../actions/comments";
import { getUserID } from "../../actions/auth";

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
    const commentsResponse = await getComments(1);
    console.log('commentsResponse.data: ', commentsResponse.data);
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

  displayComments = (comments) => {
    const { userID, editingCommentID, replyingParentID, subText } = this.state;
    return comments.map(comment => <div>
      {comment.author}
      {editingCommentID === comment.commentID
        ?
        <div>
          <div className="comment">
            <input className="large mx-8" placeholder="reply" onChange={this.onChangeSubText} value={subText} />
          </div>
          <button onClick={this.onClickEditSave}>Save</button>
          <button onClick={this.onClickCancel}>Cancel</button>
        </div>
        :
        <div>
          <div className="comment">
            <span>{comment.text}</span>
          </div>
          <button onClick={() => this.onClickReply(comment.commentID)}>Reply</button>
          {comment.userID === userID && <button onClick={() => this.onClickEditComment(comment.commentID)}>Edit</button>}

          {replyingParentID === comment.commentID && <div className="px-20">
            <div className="comment">
              <input className="large mx-8" placeholder="reply" onChange={this.onChangeSubText} value={subText} />
            </div>
            <button onClick={this.onClickReplySave}>Save</button>
            <button onClick={this.onClickCancel}>Cancel</button>
          </div>}

        </div>
      }
      <div className="px-20">
        {this.displayComments(comment.children)}
      </div>
    </div>)
  }

  render() {
    const { mainText, comments } = this.state;

    return (
      <div className="layout-column align-items-center justify-content-start" >
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input type="mainText" className="large mx-8" placeholder="Comment" onChange={this.onChangeMainText} value={mainText} />
          <button onClick={this.onClickAddComment}>Add Comment</button>
        </section>

        <div className="card w-40 pt-30 pb-8">
          {this.displayComments(comments)}
        </div>
      </div>
    );
  }
}


export default Comments;