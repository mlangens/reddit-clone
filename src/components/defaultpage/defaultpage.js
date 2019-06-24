import React from 'react';
import './defaultpage.css';

class DefaultPage extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
      error: false
    };
    this.handleInput = this.handleInput.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  handleInput(event) {
    this.setState({inputValue: event.target.value});
  }

  submitHandler() {
    if (this.state.inputValue !== "" && this.state.inputValue.split(' ').length < 2) {
      this.props.history.push(`/${this.state.inputValue}/0`);
    } else {
      this.setState({error: true});
    }
  }

  render () {
    return (
      <div className="defaultPage">
        <h2 className="defaultPageTitle">Type Subreddit Here</h2>
        <input className="defaultInput" type="text" value={this.state.inputValue} onChange={this.handleInput} name="subreddit" />
        <input className="defaultSubmit" type="submit" value="Submit" onClick={this.submitHandler} />
        <h3>{this.state.error}</h3>
      </div>
    );
  }
}

export default DefaultPage;
