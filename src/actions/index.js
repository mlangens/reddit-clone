import axios from 'axios';

export const getPosts = (subredditName, count) => dispatch => {
    const urlSuffix = `${subredditName}.json?count=${count}`
    const urlPrefix = 'https://old.reddit.com/r/'
    axios.get(urlPrefix + urlSuffix).then((response) => {
        const after = response.data.data.after;
        const before = response.data.data.before;
        const rawPosts = response.data.data.children;
        const posts = rawPosts.map((rawPost) => {
          return {
            title: rawPost.data.title,
            timeSubmitted: new Date(rawPost.data.created * 1000).toDateString(),
            thumbnailURL: (rawPost.data.thumbnail === "self" || rawPost.data.thumbnail === "default")
              ? null : rawPost.data.thumbnail,
            linkToPost: `http://reddit.com/${rawPost.data.permalink}`,
            author: rawPost.data.author,
            id: rawPost.data.id,
          };
        });
        dispatch(getPostsSuccess(posts, before, after));
    }).catch((error) => {
      if (error.response || error.request || error.message) {
        dispatch(getPostsFailed(error));
      }
  });
}

const getPostsSuccess = (posts, before, after) => ({
  type: 'FETCH_POSTS_SUCCESS',
  payload: {posts, before, after}
});

const getPostsFailed = (error) => ({
  type: 'FETCH_POSTS_FAILED',
  payload: {error}
});
