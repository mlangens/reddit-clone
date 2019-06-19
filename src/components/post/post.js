import React from 'react';
import './post.css';

class Post extends React.Component {
  render () {
    const {title, timeSubmitted, thumbnailURL, linkToPost, author} = this.props.post;
    return (
      <div className="post">
        {thumbnailURL && <img className="postThumb" alt="thumbnail" src={thumbnailURL}></img>}
        <span className="postTitle">{title}</span>
        <div className="timePosted">{timeSubmitted}</div>
        <a href={linkToPost} className="postPermalink">Permalink</a>
        <div className="postAuthor">By: {author}</div>
      </div>
    );
  }
}

export default Post;
