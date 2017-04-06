const React = require('react');
const ReactNative = require('react-native');
const config = require('../../config/config');
const API = require('../../config/API');
const fetcher = require('../../util/fetcher');

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
      password: '',
      errorMessage: ''
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
    const url = config.server + API.login;
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

    fetcher.json(url, fetchOption)
      .then((response) => {

        const body = response.body;

        if(response.ok) {

          if(body && body.login === true) {
            this.setState({
              errorMessage : body.message
            });
          } else {
            this.setState({
              errorMessage : body.message
            });
          }

        } else {

          const newState = {};

          if(body && body.login === false) {
            newState.errorMessage = (body.message ? body.message : 'Login unsuccessfull');
          } else {
            newState.errorMessage = 'Unknown login problem';
          }

          this.setState(newState);
        }

      })
      .catch((err) => {
        this.setState({
          errorMessage: 'There was a problem in the login'
        });
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
