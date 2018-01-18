ReactBetterPassword
===================

Password input for [ReactJS](http://facebook.github.io/react/index.html) that mimics mobile password masking behavior. Delays the masking of the last character to improve user accuracy.

#### Purpose:

> Usability suffers when users type in passwords and the only feedback they get is a row of bullets. Typically, masking passwords doesn’t even increase security, but it does cost you business due to login failures.
useit.com/alertbox/passwords.html

Mobile devices solve this problem by revealing the last character entered in a password field and masking it after a short delay.

This component solves the problems that the most common implementation ([library](https://blog.decaf.de/2009/07/07/iphone-like-password-fields-using-jquery/), [article](https://www.sitepoint.com/better-passwords-1-the-masked-password-field/)) faces: not being able to type in the middle or start of the string.

This component allows the user to edit the password in the middle start or end of the string and it also maintains the cursor's position. Finally you can also select part of the password and replace or even paste strings from the clipboard in any part of the password.

## Demo & Examples

[karaggeorge.github.io/react-better-password](http://karaggeorge.github.io/react-better-password)

## Installation
```
npm install react-better-password
```
Or using yarn
```
yarn add react-better-password
```


You can then import it as follows:
```js
import Password from 'react-better-password';
```
or
```js
var Password = require('react-better-password');
```

## Usage

ReactBetterPassword simply creates an input field which takes care of the mobile like masking. The last character's masking is delayed by a specific amount.

It acts as a controlled component if though it's not. It has a state to keep track of the actual password. When the value is changed `onChange(value)` will fire. That `value` needs to be passed back to the component in the value prop.

If a different value needs to be passed (unlike scenario that the application will change a password, without user input) the value will update but remain fully masked.

```js
import React from 'react';
import Password from 'react-better-password';

class App extends React.Component {
  state = {
    password: '',
  }
  
  handleChange = (password) => this.setState({ password });

  render() {
    const { password } = this.state;
    
    return (
      <Password value={password} onChange={this.handleChange} />
    );
  }
}
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
|value|String||The password value|
|onChange(`value`)|Function||The callback to be called when the value changes|
|show|Bool|false|Wether to show the password or mask it|
|mask|String|•|The character to use for the masking|
|timeout|Number|1000|Time in milliseconds to delay the masking of the last character|

Any additional props passed in will be directly applied to the input element. This is particularly when styling the component:
```js
<Password className='my-class' id='password' />
```
## Contributing
Any contributions are welcomed!

## License
MIT Licensed. Copyright (c) George Karagkiaouris 2018.






