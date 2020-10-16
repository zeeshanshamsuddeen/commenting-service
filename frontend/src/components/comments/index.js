import React, { Component } from "react";
import "./index.css";
import { getComments, addComment } from "../../actions/comments";

class Comments extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      text: '',
    }
  }

  componentDidMount = () => {
    this.fetchComments();
  }

  fetchComments = async () => {
    const commentsResponse = await getComments(1);
    console.log('commentsResponse.data: ', commentsResponse.data);
    if (commentsResponse.data && commentsResponse.data.success) {
      this.setState({ comments: commentsResponse.data.comments });
    }
  }

  onChangeTitle = (e) => {
    this.setState({ text: e.target.value });
  }

  onClickAddComment = async () => {
    const { text } = this.state;
    if (!text) {
      alert('Invalid Comment');
      return;
    };
    const { level = 0, id } = this.props.match.params;
    const initObject = {
      text,
      level: Number(level) + 1,
      taskId: id,
    };
    await addComment(initObject);
    this.setState({ text: '' });
    this.fetchComments();
  }

  displayComments = (comments) => {
    return comments.map(comment => <div className="comment">
      {comment.text}
    </div>)
  }

  render() {
    const { text, comments } = this.state;

    return (
      <div className="layout-column align-items-center justify-content-start" >
        <section className="layout-row align-items-center justify-content-center mt-30">
          <input type="text" className="large mx-8" placeholder="Comment" onChange={this.onChangeTitle} value={text} />
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