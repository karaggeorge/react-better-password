import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class ReactBetterPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      unmasked: props.value,
      value: Array(props.value.length + 1).join(props.mask),
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { mask } = this.props;

    if(nextProps.value !== this.state.unmasked) {
      this.setState({
        unmasked: nextProps.value,
        value: Array(nextProps.value.length + 1).join(nextProps.mask)
      });
    }

    if(nextProps.mask && nextProps.mask !== mask) {
      this.setState({ value: Array(this.state.value.length + 1).join(nextProps.mask)});
    }
  }

  onChange(ev) {
    const { timeout, onChange, mask } = this.props;

    // Reset the previous showing character
    clearTimeout(this.timer);

    // Save the current cursor position to restore after masking
    const cursorPos = this.input.selectionEnd;

    const value = ev.target.value;
    const { unmasked } = this.state;

    // This is going to be the new original value (unmasked)
    const newValue = value.replace(new RegExp(`${ cursorPos ? `(^\\${mask}{1,${cursorPos}})|` : '' }(\\${mask}+)`, 'g'), (match, part, offset, string) => {
      if(!offset && cursorPos) return unmasked.substr(0, match.length);
      else return unmasked.substr(-match.length);
    });

    // Mask the value leaving the last character entered intact
    const maskedValue = value.split('').map((c, index) => index === cursorPos-1 ? c : mask).join('');

    this.setState({ value:  maskedValue, unmasked: newValue }, () => {
      if(onChange) onChange(newValue);

      // Restore cursor position
      this.input.selectionStart = cursorPos;
      this.input.selectionEnd = cursorPos;

      // Set a timeout to replace the last showing character
      this.timer = setTimeout(() => {
        // Save user's current selection
        const start = this.input.selectionStart;
        const end = this.input.selectionEnd;

        this.setState({ value: Array(value.length + 1).join(mask) }, () => {
          // Restore cursor position once again
          this.input.selectionStart = start;
          this.input.selectionEnd = end;
        });
      }, timeout);
    });
  }

  render() {
    const { value, unmasked } = this.state;
    const { show } = this.props;

    const inputProps = _.omit(this.props, _.keys(ReactBetterPassword.propTypes));

    return (
      <input
        { ...inputProps }
        ref={(input) => { this.input = input; }}
        type='text'
        value={ show ? unmasked : value }
        onChange={this.onChange} />
    );
  }
}

ReactBetterPassword.propTypes = {
  value: PropTypes.string,
  mask: PropTypes.string,
  timeout: PropTypes.number,
  onChange: PropTypes.func,
  show: PropTypes.bool,
};

ReactBetterPassword.defaultProps = {
  value: '',
  timeout: 1000,
  mask: '•',
  show: false,
};

export default ReactBetterPassword;
