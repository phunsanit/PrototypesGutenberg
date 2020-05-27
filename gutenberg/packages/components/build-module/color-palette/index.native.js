import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { ScrollView, TouchableWithoutFeedback, View, Animated, Easing } from 'react-native';
import { map, uniq } from 'lodash';
/**
 * WordPress dependencies
 */

import { useState, useEffect, createRef } from '@wordpress/element';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import styles from './style.scss';
import ColorIndicator from '../color-indicator';
import { colorsUtils } from '../mobile/color-settings/utils';
var ANIMATION_DURATION = 200;

function ColorPalette(_ref) {
  var setColor = _ref.setColor,
      activeColor = _ref.activeColor,
      isGradientColor = _ref.isGradientColor,
      defaultSettings = _ref.defaultSettings,
      currentSegment = _ref.currentSegment,
      onCustomPress = _ref.onCustomPress,
      shouldEnableBottomSheetScroll = _ref.shouldEnableBottomSheetScroll;
  var customSwatchGradients = ['linear-gradient(120deg, rgba(255,0,0,.8), 0%, rgba(255,255,255,1) 70.71%)', 'linear-gradient(240deg, rgba(0,255,0,.8), 0%, rgba(0,255,0,0) 70.71%)', 'linear-gradient(360deg, rgba(0,0,255,.8), 0%, rgba(0,0,255,0) 70.71%)'];
  var scrollViewRef = createRef();
  var isGradientSegment = currentSegment === colorsUtils.segments[1];

  var _useState = useState(new Animated.Value(1)),
      _useState2 = _slicedToArray(_useState, 1),
      scale = _useState2[0];

  var _useState3 = useState(new Animated.Value(1)),
      _useState4 = _slicedToArray(_useState3, 1),
      opacity = _useState4[0];

  var defaultColors = uniq(map(defaultSettings.colors, 'color'));
  var defaultGradientColors = uniq(map(defaultSettings.gradients, 'gradient'));
  var colors = isGradientSegment ? defaultGradientColors : defaultColors;
  useEffect(function () {
    scrollViewRef.current.scrollTo({
      x: 0,
      y: 0
    });
  }, [currentSegment]);

  function isSelectedCustom() {
    return !isGradientColor && activeColor && !colors.includes(activeColor);
  }

  function isSelected(color) {
    return !isSelectedCustom() && activeColor === color;
  }

  function timingAnimation(property, toValue) {
    return Animated.timing(property, {
      toValue: toValue,
      duration: ANIMATION_DURATION,
      easing: Easing.ease,
      useNativeDriver: true
    });
  }

  function performAnimation(color) {
    opacity.setValue(isSelected(color) ? 1 : 0);
    scale.setValue(1);
    Animated.parallel([timingAnimation(scale, 2), timingAnimation(opacity, 1)]).start();
  }

  var scaleInterpolation = scale.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 0.7, 1]
  });

  function onColorPress(color) {
    performAnimation(color);
    setColor(color);
  }

  var verticalSeparatorStyle = usePreferredColorSchemeStyle(styles.verticalSeparator, styles.verticalSeparatorDark);
  return createElement(ScrollView, {
    contentContainerStyle: styles.contentContainer,
    style: styles.container,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    keyboardShouldPersistTaps: "always",
    disableScrollViewPanResponder: true,
    onScrollBeginDrag: function onScrollBeginDrag() {
      return shouldEnableBottomSheetScroll(false);
    },
    onScrollEndDrag: function onScrollEndDrag() {
      return shouldEnableBottomSheetScroll(true);
    },
    ref: scrollViewRef
  }, colors.map(function (color) {
    var scaleValue = isSelected(color) ? scaleInterpolation : 1;
    return createElement(TouchableWithoutFeedback, {
      onPress: function onPress() {
        return onColorPress(color);
      },
      key: "".concat(color, "-").concat(isSelected(color))
    }, createElement(Animated.View, {
      style: {
        transform: [{
          scale: scaleValue
        }]
      }
    }, createElement(ColorIndicator, {
      color: color,
      isSelected: isSelected(color),
      opacity: opacity,
      style: styles.colorIndicator
    })));
  }), !isGradientSegment && createElement(Fragment, null, createElement(View, {
    style: verticalSeparatorStyle
  }), createElement(TouchableWithoutFeedback, {
    onPress: onCustomPress
  }, createElement(View, null, createElement(ColorIndicator, {
    withCustomPicker: !isGradientSegment,
    color: customSwatchGradients,
    isSelected: isSelectedCustom(),
    style: styles.colorIndicator
  })))));
}

export default ColorPalette;
//# sourceMappingURL=index.native.js.map