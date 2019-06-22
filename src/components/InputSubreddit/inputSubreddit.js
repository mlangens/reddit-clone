import React from 'react';

class InputSubreddit extends React.Component {
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
      <div>
        Type Subreddit Here
        <input type="text" value={this.state.inputValue} onChange={this.handleInput} name="subreddit" />
        <input type="submit" value="Submit" onClick={this.submitHandler} />
      </div>
    );
  }
}

export default InputSubreddit;
