# React Native Loading Placeholder [![npm version](https://img.shields.io/npm/v/react-native-loading-placeholder.svg?style=flat)](https://www.npmjs.com/package/react-native-loading-placeholder)

A cross-platform customizable loading placeholder component for React Native.

- Checkout the [example/](https://github.com/zeljkoX/react-native-loading-placeholder/tree/master/example) folder for source code.


## Features

- Highly customizable


## Demo

<img src="https://github.com/zeljkoX/react-native-loading-placeholder/blob/master/demo/react-native-loading-placeholder.gif" width="360">


## Installation

```sh
yarn add react-native-loading-placeholder
npm install react-native-loading-placeholder
```


## Example

```js

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { PlaceholderContainer, Placeholder, AsyncComponent } from 'react-native-loading-placeholder';
import LinearGradient from 'react-native-linear-gradient';

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

const PlaceholderExample = () => {
  return (
    <PlaceholderContainer
      style={{ width: 200 }}
      duration={3000}
      animatedComponent={<Gradient/>}
    >
      <Placeholder
        style={[styles.placeholder, { width: 50, height: 50 }]}
      />
      <Placeholder
        style={[styles.placeholder, { width: 200, height: 10 }]}
      />
      <Placeholder
        style={[styles.placeholder, { width: 200, height: 10 }]}
      />
      <Placeholder
        style={[styles.placeholder, { width: 200, height: 10 }]}
      />
      <Placeholder
        style={[styles.placeholder, { width: 50, height: 50, left: 100 }]}
      />
    </PlaceholderContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
    backgroundColor: '#fff'
  },
  placeholder: {
    alignSelf: 'flex-start',
    margin: 5,
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  }
});

```


## API

The package exposes the following components,

### `<PlaceholderContainer />`

Container component responsible for orchestrating animations in placeholder components.

#### Props

- `duration` - Animated timing 'speed'
- `style` - Container style,
- `animatedComponent` -  Animated component (example: gradient component)


### `<Placeholder />`

Component that displays animated component

#### Props

- `style` - Object


### `<AsyncComponent />`

Component that renders Children until loader prop is resolved with Component to display

#### Props

- `loader` - Promise that resolves with React Component
- `renderPlaceholder` - PlaceholderContainer
