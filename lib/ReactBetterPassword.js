'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ReactBetterPassword = (function (_Component) {
  _inherits(ReactBetterPassword, _Component);

  function ReactBetterPassword(props) {
    _classCallCheck(this, ReactBetterPassword);

    _get(Object.getPrototypeOf(ReactBetterPassword.prototype), 'constructor', this).call(this, props);

    this.state = {
      maskedValue: ''
    };

    this.onChange = this.onChange.bind(this);
    this.decodeValue = this.decodeValue.bind(this);
    this.maskValue = this.maskValue.bind(this);
    this.saveCursorPosition = this.saveCursorPosition.bind(this);
    this.resetCursorPosition = this.resetCursorPosition.bind(this);
  }

  _createClass(ReactBetterPassword, [{
    key: 'decodeValue',
    value: function decodeValue(newValue) {
      var _props = this.props;
      var oldValue = _props.value;
      var mask = _props.mask;

      var index = 0;

      return newValue.split('').map(function (char) {
        return char === mask ? oldValue[index++] : char;
      }).join('');
    }
  }, {
    key: 'maskValue',
    value: function maskValue(value) {
      var _this = this;

      var _props2 = this.props;
      var mask = _props2.mask;
      var timeout = _props2.timeout;

      var lastIndex = value.split('').reduce(function (last, char, index) {
        return char !== mask ? index : last;
      }, 0);

      this.timer = setTimeout(function () {
        _this.saveCursorPosition();
        _this.setState({ maskedValue: value.split('').map(function () {
            return mask;
          }).join('') }, _this.resetCursorPosition);
      }, timeout);
      return value.split('').map(function (char, index) {
        return index !== lastIndex ? mask : char;
      }).join('');
    }
  }, {
    key: 'saveCursorPosition',
    value: function saveCursorPosition() {
      this.cursor = this.refs.input.selectionStart;
    }
  }, {
    key: 'resetCursorPosition',
    value: function resetCursorPosition() {
      var cursorPostion = this.cursor;

      this.refs.input.selectionStart = cursorPostion;
      this.refs.input.selectionEnd = cursorPostion;
    }
  }, {
    key: 'onChange',
    value: function onChange(ev) {
      var value = ev.target.value;
      var onChange = this.props.onChange;

      clearTimeout(this.timer);
      this.saveCursorPosition();

      var newValue = this.decodeValue(value);
      onChange(newValue);

      var maskedValue = this.maskValue(value);
      this.setState({ maskedValue: maskedValue }, this.resetCursorPosition);
    }
  }, {
    key: 'render',
    value: function render() {
      var maskedValue = this.state.maskedValue;

      return _react2['default'].createElement('input', {
        ref: 'input',
        type: 'text',
        value: maskedValue,
        onChange: this.onChange });
    }
  }]);

  return ReactBetterPassword;
})(_react.Component);

ReactBetterPassword.propTypes = {
  className: _react.PropTypes.string,
  id: _react.PropTypes.string,
  mask: _react.PropTypes.string,
  name: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  placeholder: _react.PropTypes.string,
  timeout: _react.PropTypes.number,
  value: _react.PropTypes.string
};

ReactBetterPassword.defaultProps = {
  mask: '•',
  timeout: 500
};

exports['default'] = ReactBetterPassword;
module.exports = exports['default'];