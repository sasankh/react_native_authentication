const React = require('react');
const ReactNative = require('react-native');

const {
  View,
  Text,
  StyleSheet,
  TextInput
} = ReactNative;

const Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    }
  },
  render: function() {
    return (
      <View style={[styles.container]}>
        <Text>
          Sign In
        </Text>

        <Text style={[styles.label]}>Username:</Text>
        <TextInput
          style={[styles.input]}
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
        />

        <Text style={[styles.label]}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={[styles.input]}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
        />

        <Button text={'Sign In'} onPress={this.onPress} />
      </View>
    );
  },
  onPress: function() {
    //log the user in
    const url = 'http://10.10.120.21:3000/login';
    const fetchOption = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    };

    fetch(url, fetchOption)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        console.log(json);
        const newState = {};

        if(json && json.login === true) {
          newState.username = 'Logged In';
        } else {
          newState.username = 'Rejected';
        }

        this.setState(newState);
      })
      .catch((err) => {
        console.log(err);
      });

      this.setState({
        password: ''
      });

  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  label:{
    fontSize: 18
  }
});
