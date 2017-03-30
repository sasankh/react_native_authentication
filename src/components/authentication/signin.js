const React = require('react');
const ReactNative = require('react-native');

const {
  View,
  Text,
  StyleSheet,
  TextInput
} = ReactNative;

module.exports = React.createClass({
  render: function() {
    return (
      <View style={[styles.container]}>
        <Text>
          Sign In
        </Text>
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
