import reducer from './postsReducer';
import expect from 'expect';

const initialState = {
  "after": "",
  "before": "",
  "posts": [],
  "error": null,
};

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_POSTS_SUCCESS', () => {
    const posts = "posts";
    const before = "before";
    const after = "after";
    const successAction = {
      type: 'FETCH_POSTS_SUCCESS',
      payload: {posts, before, after}
    };
    expect(reducer(initialState, successAction)).toEqual({posts, before, after});
  });

  it('should handle FETCH_POSTS_FAILED', () => {
    const error = {"error": {"error": "error"}};
    const failAction = {
      type: 'FETCH_POSTS_FAILED',
      payload: {...error}
    };
    expect(reducer(initialState, failAction)).toEqual({"error": {"error": "error"}});
  });
});

