var React = require('react');
var ReactDOM = require('react-dom');
var ReactPassword = require('react-password');

var App = React.createClass({
	render () {
		return (
			<div>
				<ReactPassword />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
