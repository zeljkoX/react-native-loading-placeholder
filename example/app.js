/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import {
  PlaceholderContainer,
  Placeholder,
  AsyncComponent
} from '../src/index';
import LinearGradient from 'react-native-linear-gradient';

export default class reactNativeLoadingPlaceholder extends Component {
  render() {
    return <Test />;
  }
}

class Test extends Component {
  loadingComponent: Promise<React.Element<*>>;
  constructor(props) {
    super(props);
  }
  componentWillMount(): void {
    this.loadingComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve(<View><Text>Resolved</Text></View>);
      }, 60000);
    });
  }
  render() {
    return (
        <AsyncComponent loader={this.loadingComponent}>
          <View style={styles.container}>
            <PlaceholderTest />
            <PlaceholderTest />
          </View>
        </AsyncComponent>
    );
  }
}

const Gradient = (): React.Element<*> => {
  return (
    <LinearGradient
      colors={['#eeeeee', '#dddddd', '#eeeeee']}
      start={{ x: 1.0, y: 0.0 }}
      end={{ x: 0.0, y: 0.0 }}
      style={{
        flex: 1,
        width: 120
      }}
    />
  );
};

const PlaceholderTest = () => {
  return (
    <PlaceholderContainer
      style={styles.placeholderContainer}
      animatedComponent={<Gradient />}
      duration={1000}
    >
      <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
      <Placeholder
        style={[
          styles.placeholder,
          {
            position: 'absolute',
            top: 15,
            left: '17%',
            width: '50%',
            height: 10
          }
        ]}
      />
      <Placeholder
        style={[
          styles.placeholder,
          {
            position: 'absolute',
            top: 31,
            left: '17%',
            width: '35%',
            height: 7
          }
        ]}
      />

      <Placeholder
        style={[styles.placeholder, { marginTop: 20, width: '80%' }]}
      />
      <Placeholder
        style={[styles.placeholder, { width: '90%' }]}
      />
      <Placeholder
        style={[styles.placeholder, { width: '50%' }]}
      />
    </PlaceholderContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 25,
    backgroundColor: '#f6f7f8'
  },
  placeholderContainer: {
    width: '90%',
    backgroundColor: '#fff',
    height: 200
  },
  placeholder: {
    height: 8,
    marginTop: 6,
    marginLeft: 15,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    backgroundColor: '#eeeeee'
  }
});

AppRegistry.registerComponent(
  'reactNativeLoadingPlaceholder',
  () => reactNativeLoadingPlaceholder
);
