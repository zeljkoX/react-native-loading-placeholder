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
} from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export default class Test extends Component {
  loadingComponent: Promise<React.Element<*>>;
  loadingComponent1: Promise<*>;
  constructor(props) {
    super(props);
  }
  componentWillMount(): void {
    this.loadingComponent = new Promise(resolve => {
      setTimeout(() => {
        resolve(
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Resolved</Text>
          </View>
        );
      }, 6000);
    });
    this.loadingComponent1 = new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 8000);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <PlaceholderExample loader={this.loadingComponent} />
        <PlaceholderExample1 loader={this.loadingComponent1} />
      </View>
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

const PlaceholderExample = ({
  loader
}: {
  loader: Promise<*>
}): React.Element<*> => {
  return (
    <PlaceholderContainer
      style={styles.placeholderContainer}
      animatedComponent={<Gradient />}
      duration={1000}
      delay={1000}
      loader={loader}
    >
      <View style={{ flexDirection: 'row' }}>
        <Placeholder style={[styles.placeholder, { width: 50, height: 50 }]} />
        <View
          style={{
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '50%',
                height: 10
              }
            ]}
          />
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '35%',
                height: 7
              }
            ]}
          />
        </View>
      </View>

      <Placeholder
        style={[styles.placeholder, { marginTop: 20, width: '80%' }]}
      />
      <Placeholder style={[styles.placeholder, { width: '90%' }]} />
      <Placeholder style={[styles.placeholder, { width: '50%' }]} />
    </PlaceholderContainer>
  );
};

const PlaceholderExample1 = ({
  loader
}: {
  loader: Promise<*>
}): React.Element<*> => {
  return (
    <PlaceholderContainer
      style={styles.placeholderContainer}
      animatedComponent={<Gradient />}
      duration={1000}
      delay={1000}
      loader={loader}
      replace={true}
    >
      <View style={{ flexDirection: 'column' }}>
        <View style={styles.row}>
          <Text style={{ width: '20%', textAlign: 'center' }}>Name</Text>
          <Placeholder
            style={[
              styles.placeholder,
              {
                width: '50%',
                height: 10
              }
            ]}
          >
            <Text>John Doe</Text>
          </Placeholder>

        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={styles.row}>
            <Text style={{ width: '20%', textAlign: 'center' }}>Age</Text>
            <Placeholder
              style={[
                styles.placeholder,
                {
                  width: '15%',
                  height: 10
                }
              ]}
            >
              <Text>47</Text>
            </Placeholder>
          </View>
        </View>
      </View>
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
  },
  row: {
    flexDirection: 'row',
    width: '100%'
  }
});

AppRegistry.registerComponent(
  'reactNativeLoadingPlaceholder',
  () => reactNativeLoadingPlaceholder
);
