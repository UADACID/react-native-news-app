/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  WebView,
  StyleSheet,
} from 'react-native';

export default class WebViews extends Component {

  static navigationOptions = ({ navigation }) => ({
      title: `${navigation.getParam('title', 'Title News')}`,
  })

  render() {
    const url = this.props.navigation.getParam('url', 'www.google.com')
    return (
      <View style={styles.container}>
        <WebView
          source={{uri: url}}
          style={{marginTop: 20}}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
