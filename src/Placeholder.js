/*
* @flow
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';

type PlaceholderProps = {
  style: Object,
  animatedComponent: React.Element<*>
};

type PlaceholderState = {
  x: number,
  width: number,
  isMeasured: boolean,
  resolved: boolean
};

export default class Placeholder extends Component {
  state: PlaceholderState;
  props: PlaceholderProps;
  constructor(props: PlaceholderProps) {
    super(props);
    this.state = {
      x: 0,
      width: 0,
      isMeasured: false,
      resolved: false
    };
  }

  componentDidMount(): void {
    this.context.registerPlaceholder(this);
  }

  render(): React.Element<*> {
    const { style, children } = this.props;
    const { x, isMeasured, resolved } = this.state;
    const { animatedComponent, position } = this.context;

    if (resolved) {
      return children
    }
    const animatedStyle = {
      height: '100%',
      width: '100%',
      transform: [{ translateX: position }],
      left: -x
    };
    return (
      <View
        ref={ref => {
          this.testRef = ref;
        }}
        onLayout={this._setDimensions}
        style={[style, styles.overflow]}
      >
        {isMeasured &&
          <Animated.View style={animatedStyle}>
            {animatedComponent}
          </Animated.View>}
      </View>
    );
  }
  _resolve = () => {
    this.setState(() => ({ resolved: true }));
  };

  _setDimensions = (event): void => {
    const { x } = event.nativeEvent.layout;
    this.setState(() => ({ x, isMeasured: true }));
  };
}

Placeholder.contextTypes = {
    position: PropTypes.object.isRequired,
    animatedComponent: PropTypes.object.isRequired,
    registerPlaceholder: PropTypes.func.isRequired
}


const styles = StyleSheet.create({
  overflow: {
    overflow: 'hidden'
  }
});
