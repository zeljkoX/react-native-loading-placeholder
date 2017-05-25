/*
* @flow
*/

import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Platform
} from 'react-native';

const screenWidth = Dimensions.get('window').width;

type PlaceholderContainerProps = {
  duration: number,
  style: Object,
  animatedComponent: React.Element<*>
};

type PlaceholderContainerState = {
  containerComponent: Object,
  animatedComponent: Object,
  startPosition: number,
  stopPosition: number,
  isContainerMeasured: boolean,
  isAnimatedComponentMeasured: boolean
};

export class PlaceholderContainer extends Component {
  props: PlaceholderContainerProps;
  state: PlaceholderContainerState;
  position: Animated.Value;
  elements: Object;
  constructor(props: PlaceholderContainerProps) {
    super(props);
    this.state = {
      containerComponent: { x: 0, y: 0, width: 0, height: 0 },
      animatedComponent: { x: 0, y: 0, width: 0, height: 0 },
      startPosition: 0,
      stopPosition: 0,
      isContainerComponentMeasured: false,
      isAnimatedComponentMeasured: false
    };
    this.position = new Animated.Value(0);
    this.elements = this._cloneElements();
  }

  render(): React.Element<*> {
    const { style, elements, animatedComponent } = this.props;
    const { isAnimatedComponentMeasured } = this.state;
    return (
      <View
        ref={ref => {
          this.containerRef = ref;
        }}
        onLayout={this._measureContainerComponent}
        style={style}
      >
        {this.elements}
        {!isAnimatedComponentMeasured &&
          <View
            ref={ref => {
              this.componentRef = ref;
            }}
            onLayout={this._measureAnimatedComponent}
            style={styles.offscreen}
          >
            {animatedComponent}
          </View>}
      </View>
    );
  }

  _triggerAnimation = (cb: Function): void => {
    const { duration } = this.props;
    const { startPosition, stopPosition } = this.state;
    Animated.sequence([
      Animated.timing(this.position, {
        toValue: stopPosition || screenWidth,
        duration: duration
      }),
      Animated.timing(this.position, {
        toValue: startPosition || 0,
        duration: 0
      })
    ]).start(cb);
  };

  _startAndRepeat = (): void => {
    this._triggerAnimation(this._startAndRepeat);
  };

  _cloneElements = (): Array<React.Element<*>> => {
    const { children, animatedComponent } = this.props;
    let result = null;
    const components = (children.length && children) || [children];
    if (components) {
      result = components.map((item, i) => {
        if (
          item &&
          item.type &&
          item.type.prototype.constructor.name === 'Placeholder'
        ) {
          return React.cloneElement(item, {
            key: i,
            position: this.position,
            animatedComponent
          });
        } else {
          return React.cloneElement(item, { key: i });
        }
      });
    }
    return result;
  };

  _measureContainerComponent = (event: Object): void => {
    const { x, y, height, width } = event.nativeEvent.layout;
    this.setState(
      () => ({
        containerComponent: {
          x,
          y,
          height,
          width
        },
        isContainerComponentMeasured: true
      }),
      () => {
        this._setAnimationPositions();
      }
    );
  };

  _measureAnimatedComponent = (event): void => {
    const { x, y, height, width } = event.nativeEvent.layout;
    this.setState(
      () => ({
        animatedComponent: {
          x,
          y,
          height,
          width
        },
        isAnimatedComponentMeasured: true
      }),
      () => {
        this._setAnimationPositions();
      }
    );
  };

  _setAnimationPositions = (): void => {
    const {
      containerComponent,
      animatedComponent,
      isContainerComponentMeasured,
      isAnimatedComponentMeasured
    } = this.state;
    if (!isContainerComponentMeasured || !isAnimatedComponentMeasured) {
      return;
    }
    const startPosition = -(containerComponent.x + animatedComponent.width);
    const stopPosition =
      containerComponent.x + containerComponent.width + animatedComponent.width;
    this.setState(
      () => ({
        startPosition,
        stopPosition
      }),
      () => {
        this.position.setValue(startPosition);
        this._startAndRepeat();
      }
    );
  };
}

type PlaceholderProps = {
  position: Animated.Value,
  style: Object,
  animatedComponent: React.Element<*>
};

type PlaceholderState = {
  x: number,
  width: number,
  isMeasured: boolean
};

export class Placeholder extends Component {
  state: PlaceholderState;
  props: PlaceholderProps;
  constructor(props: PlaceholderProps) {
    super(props);
    this.state = {
      x: 0,
      width: 0,
      isMeasured: false
    };
  }
  render(): React.Element<*> {
    const { position, style, animatedComponent } = this.props;
    const { x, isMeasured } = this.state;
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
  _setDimensions = (event): void => {
    const { x } = event.nativeEvent.layout;
    this.setState(() => ({ x, isMeasured: true }));
  };
}

type AsyncComponentState = {
  Component: ?React.Element<*>
};

type AsyncComponentProps = {
  loader: Function
};

export class AsyncComponent extends React.Component {
  state: AsyncComponentState;
  props: AsyncComponentProps;
  constructor(props: AsyncComponentProps) {
    super(props);
    this.state = {
      Component: null
    };
  }
  componentDidMount(): void {
    const { loader } = this.props;
    loader &&
      loader.then(Component => {
        this.setState({ Component });
      });
  }
  render(): ?React.Element<*> {
    const { Component } = this.state;
    const { children } = this.props;
    if (Component) {
      return Component;
    }
    return children;
  }
}

const styles = StyleSheet.create({
  overflow: {
    overflow: 'hidden'
  },
  offscreen: {
    position: 'absolute',
    left: -1000
  }
});
