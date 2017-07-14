import React, { Component, PropTypes } from 'react';

class ReactBetterPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maskedValue: ''
    };

    this.onChange = this.onChange.bind(this);
    this.decodeValue = this.decodeValue.bind(this);
    this.maskValue = this.maskValue.bind(this);
    this.saveCursorPosition = this.saveCursorPosition.bind(this);
    this.resetCursorPosition = this.resetCursorPosition.bind(this);
  }

  decodeValue(newValue) {
    const { value: oldValue, mask } = this.props;

    let index = 0;

    return newValue.split('').map(char => {
      return char === mask ? oldValue[index++] : char;
    }).join('');
  }

  maskValue(value) {
    const { mask, timeout } = this.props;
    const lastIndex = value.split('').reduce(
      (last, char, index) => (char !== mask ? index : last), 0
    );

    this.timer = setTimeout(() => {
      this.saveCursorPosition();
      this.setState(
        { maskedValue: value.split('').map(() => mask).join('') },
        this.resetCursorPosition
      );
    }, timeout);
    return value.split('').map((char, index) => index !== lastIndex ? mask : char).join('');
  }

  saveCursorPosition() {
    this.cursor = this.refs.input.selectionStart;
  }

  resetCursorPosition() {
    const cursorPostion = this.cursor;
    const input = this.refs.input;

    input.selectionStart = cursorPostion;
    input.selectionEnd = cursorPostion;
  }

  onChange(ev) {
    const { target: { value } } = ev;
    const { onChange } = this.props;
    clearTimeout(this.timer);
    this.saveCursorPosition();

    const newValue = this.decodeValue(value);
    onChange(newValue);

    const maskedValue = this.maskValue(value);
    this.setState({ maskedValue }, this.resetCursorPosition);
  };

  render() {
    const { maskedValue } = this.state;
    return (
      <input
        ref='input'
        type='text'
        value={maskedValue}
        onChange={this.onChange} />
    );
  }
}

ReactBetterPassword.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  mask: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  timeout: PropTypes.number,
  value: PropTypes.string,
};

ReactBetterPassword.defaultProps = {
  mask: '•',
  timeout: 500,
};

export default ReactBetterPassword;
