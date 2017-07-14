import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactBetterPassword from 'react-better-password';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(value) {
    this.setState({ password: value });
  }

  render() {
    const { password } = this.state;
    return (
      <div>
        <ReactBetterPassword onChange={this.onChange} value={password} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
