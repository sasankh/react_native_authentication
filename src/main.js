const React = require('react');
const ReactNative = require('react-native');

const {
  StyleSheet,
  Navigator
} = ReactNative;

const Signin = require('./components/authentication/signin');
const Signup = require('./components/authentication/signup');

const ROUTES = {
  signin: Signin,
  signup: Signup
};

module.exports = React.createClass({
  componentWillMount: function() {},
  renderScene: function(route, navigation) {
    const Component = ROUTES[route.name];

    return <Component />;
  },
  render: function() {
    return (
      <Navigator
      style={[styles.container]}
      initialRoute={{ name: 'signin' }}
      renderScene={this.renderScene}
      configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }}
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
