const React = require('react');
const ReactNative = require('react-native');

const {
  View,
  Text,
  StyleSheet,
  AsyncStorage
} = ReactNative;

module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: ''
    };
  },
  componentWillMount: function(){
    AsyncStorage.getItem('@MySuperStore:username', (err, username) => {
      if(err || !username) {
        this.props.navigator.immediatelyResetRouteStack([
          {name: 'signin'}
        ]);
      } else {
        this.setState({
          username: username
        });
      }
    });
  },
  render: function() {
    return (
      <View style={[styles.container]}>
        <Text>Welcome {this.state.username}</Text>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
