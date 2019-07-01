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
    before: state.postsReducer.before,
    error: state.postsReducer.error
  }
}

export class Homepage extends React.Component {
  constructor() {
    super();
    this.clickNext = this.clickNext.bind(this);
    this.clickPrev = this.clickPrev.bind(this);
    this.clickBack = this.clickBack.bind(this);
    this.handlePosts = this.handlePosts.bind(this);
    this.timer = null;
  }

  subscribe(subreddit, count, callback) {
    this.props.onGetPosts(subreddit, count);
    this.timer = setInterval(() => callback(subreddit, count), 60 * 1000);
  }

  unsubscribe() {
    clearInterval(this.timer);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  componentDidMount() {
    const {count, subreddit} = this.props.match.params;
    this.subscribe(subreddit, count, this.props.onGetPosts);
  }

  componentDidUpdate(preProps) {
    const oldCount = preProps.match.params.count;
    const {count, subreddit} = this.props.match.params;
    if (count !== oldCount) {
      this.unsubscribe();
      this.subscribe(subreddit, count, this.props.onGetPosts)
    }
  }

  clickNext() {
    const count = parseInt(this.props.match.params.count || 0) + 25;
    const subreddit = this.props.match.params.subreddit;
    const after = this.props.after;
    this.props.history.push(`/${subreddit}/${count}&after=${after}`);
  }

  clickPrev() {
    const currentCount = parseInt(this.props.match.params.count || 0);
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

  clickBack() {
    this.props.history.push('/');
  }

  handlePosts() {
    if (this.props.posts) {
      return this.props.posts.map((postDetails, index) =>
      <Post key={`post_${index}`} post={postDetails}></Post>)
    } else if (this.props.error) {
      return <h3>This reddit does not exist</h3>;
    } else {
      return <h3>Loading</h3>;
    }
  }

  render () {
    return (
      <div className="App">
        <div className="header">
          <button onClick={this.clickBack}>Back</button>
          <br />
          <button onClick={this.clickPrev}>Prev</button>
          <button onClick={this.clickNext}>Next</button>
        </div>
        {this.handlePosts()}
        <div className="footer">
          <button onClick={this.clickPrev}>Prev</button>
          <button onClick={this.clickNext}>Next</button>
          <br />
          <button onClick={this.clickBack}>Back</button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Homepage);
