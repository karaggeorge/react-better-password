import React, { Component } from 'react';
import './App.css';
import ReactBetterPassword from 'react-better-password';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      timeout: 1000,
      mask: '•',
    };

    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onChange(value) {
    this.setState({ password: value });
  }

  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }

  render() {
    const { show, password, mask, timeout } = this.state;

    return (
      <div>
        <div className='header'>
          <h1>React Better Password</h1>
          <h4>Password input for <a href='https://reactjs.org/' target='_blank'>ReactJS</a> that mimics mobile password masking behavior. Delays the masking of the last character to improve user accuracy.</h4>
        </div>
        <div className='sub-header'>
          <a href='https://github.com/karaggeorge/react-better-password' target='_blank'>Code and Docs on Github</a>
          <iframe src="https://ghbtns.com/github-btn.html?user=karaggeorge&repo=react-better-password&type=star&count=true&size=large" frameBorder="0" scrolling="0" width="160px" height="30px"></iframe>
        </div>
        <div className='content'>
          <h3>Basic Example</h3>
          <ReactBetterPassword show={show} value={password} onChange={this.onChange} mask={mask} timeout={timeout} />
          <p>Try changing the password, editting/deleting text in the middle, or even pasting blocks of text while observing the actual value below</p>
          <h5>Props: <a href='https://github.com/karaggeorge/react-better-password' target='_blank'>(Full List)</a></h5>
          <div className='props'>
            <div className='settings'>
              <button onClick={() => this.setState({ show: !show })}>{show ? 'Hide' : 'Show'}</button>
              <label htmlFor='mask'>Mask:</label>
              <input id='mask' name='mask' type='text' value={mask} onChange={this.handleChange} />
              <label htmlFor='timeout'>Timeout:</label>
              <input id='timeout' name='timeout' type='number' value={timeout} onChange={this.handleChange}/>
            </div>
            <div className='object'>
              <span className='bracket'>{'\{'}</span>
              <ul>
                <li><span>value:</span>{password}</li>
                <li><span>show:</span>{show ? 'true' : 'false'}</li>
                <li><span>mask:</span>{mask}</li>
                <li><span>timeout:</span>{timeout}</li>
              </ul>
              <span className='bracket'>{'\}'}</span>
            </div>
          </div>

          <h3>Styled Example</h3>
          <ReactBetterPassword show={show} name='password' value={password} onChange={this.onChange} className='password' />
          <p>Any props not in the props list will be passed directly to the input, like <pre>className='password'</pre></p>
          <div class="footer">
      			Copyright &copy; 2018 George Karagkiaouris.
      		</div>
        </div>
      </div>
    );
  }
}

export default App;
