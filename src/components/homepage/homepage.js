import React from 'react';
import {getPosts} from '../../actions';
import {connect} from 'react-redux';
import Post from '../post/post'

const mapDispatchToProps = dispatch => {
  return {
    onGetPosts: (subredditName, count) => {
      dispatch(getPosts(subredditName, count));
    }
  }
}

const mapStateToProps = state => {
  return {
    posts: state.postsReducer.posts,
    after: state.postsReducer.after,
    before: state.postsReducer.before
  }
}

export class Homepage extends React.Component {
  constructor() {
    super();
    this.clickNext = this.clickNext.bind(this);
    this.clickPrev = this.clickPrev.bind(this);
  }

  componentDidMount() {
    const {count, subreddit} = this.props.match.params;
    this.props.onGetPosts(subreddit, count);
  }

  componentDidUpdate(preProps) {
    const oldCount = preProps.match.params.count;
    const {count, subreddit} = this.props.match.params;
    if (count !== oldCount) {
      this.props.onGetPosts(subreddit, count);
    }
  }

  clickNext() {
    const count = parseInt(this.props.match.params.count) + 25;
    const subreddit = this.props.match.params.subreddit;
    const after = this.props.after;
    this.props.history.push(`/${subreddit}/${count}&after=${after}`);
  }

  clickPrev() {
    const currentCount = parseInt(this.props.match.params.count);
    let count = 0;
    let beforeSuffix = "";
    if (currentCount <= 0) {
      count = 0;
    } else if (currentCount === 25) {
      count = 0;
      const subreddit = this.props.match.params.subreddit;
      this.props.history.push(`/${subreddit}/${count}${beforeSuffix}`)
    } else {
      count = currentCount - 25;
      const subreddit = this.props.match.params.subreddit;
      beforeSuffix = `&before=${this.props.before}`;
      this.props.history.push(`/${subreddit}/${count}${beforeSuffix}`);
    }
  }

  render () {
    const postsList = this.props.posts.map((postDetails, index) =>
      <Post key={`post_${index}`} post={postDetails}></Post>
    );
    return (
      <div className="App">
        <div className="header">
          <button onClick={this.clickPrev}>Prev</button>
          <button onClick={this.clickNext}>Next</button>
        </div>
        {postsList}
        <div className="footer">
          <button onClick={this.clickPrev}>Prev</button>
          <button onClick={this.clickNext}>Next</button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
