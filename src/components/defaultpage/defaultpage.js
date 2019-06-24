import React from 'react';
import './defaultpage.css';

class DefaultPage extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleInput(event) {
    this.setState({inputValue: event.target.value});
  }

  submitHandler() {
    this.props.history.push(`/${this.state.inputValue}/0`);
  }

  render () {
    return (
      <div className="defaultPage">
        <h2 className="defaultPageTitle">Type Subreddit Here</h2>
        <input className="subredditInput" type="text" value={this.state.inputValue} onChange={this.handleInput} name="subreddit" />
        <input className="submitSubreddit" type="submit" value="Submit" onClick={this.submitHandler} />
      </div>
    );
  }
}

export default DefaultPage;
