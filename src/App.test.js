import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import { Homepage } from './components/homepage/Homepage';
import "./setupTest";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// Smoke tests
it('renders without crashing shallow', () => {
  shallow(<App />);
});

// Unit-ish tests
describe('<Homepage />', () => {
  let homepageWrapper, homepageInstance, props;
  beforeEach(() => {
    props = {
      match: {
        params: {
          count: 25,
          subreddit: "oakland"
        }
      },
      history: {
        push: jest.fn(),
      },
      onGetPosts: jest.fn(),
      posts: [],
      after: 'foobarbaz',
      before: 'bazbarfoo',
    }
    homepageWrapper = shallow(<Homepage {...props} />);
    homepageInstance = homepageWrapper.instance();
  });

  it('will not navigate to a negative post count', () => {
    props.match.params.count = 0;
    homepageInstance.clickPrev();
    expect(props.history.push).not.toHaveBeenCalled();
  });

  it('increments posts by 25 when navigating forward and applies the after hash', () => {
    props.match.params.count = 0;
    homepageInstance.clickNext();
    expect(props.history.push).toHaveBeenCalledWith("/oakland/25&after=foobarbaz");
  });

  it('increments posts by 25 when navigating forward and applies the after hash', () => {
    props.match.params.count = 0;
    homepageInstance.clickNext();
    expect(props.history.push).toHaveBeenCalledWith("/oakland/25&after=foobarbaz");
  });

  it('decrements posts by 25 when navigating backwards and applies the before hash', () => {
    props.match.params.count = 50;
    homepageInstance.clickPrev();
    expect(props.history.push).toHaveBeenCalledWith("/oakland/25&before=bazbarfoo");
  });
});
