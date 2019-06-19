const initialState = {
  posts: [],
  before: "",
  after: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_POSTS_SUCCESS':
      return {
        posts: action.payload.posts,
        after: action.payload.after,
        before: action.payload.before
      }
    case 'FETCH_POSTS_FAILED':
      return {
        error: action.payload
      }
    default:
      return state
  }
 }
