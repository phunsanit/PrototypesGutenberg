"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _reactNative = require("react-native");

var _lodash = require("lodash");

var _compose = require("@wordpress/compose");

var _style = _interopRequireDefault(require("./style.scss"));

var _colorIndicator = _interopRequireDefault(require("../color-indicator"));

var _utils = require("../mobile/color-settings/utils");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
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
  var scrollViewRef = (0, _element.createRef)();
  var isGradientSegment = currentSegment === _utils.colorsUtils.segments[1];

  var _useState = (0, _element.useState)(new _reactNative.Animated.Value(1)),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      scale = _useState2[0];

  var _useState3 = (0, _element.useState)(new _reactNative.Animated.Value(1)),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 1),
      opacity = _useState4[0];

  var defaultColors = (0, _lodash.uniq)((0, _lodash.map)(defaultSettings.colors, 'color'));
  var defaultGradientColors = (0, _lodash.uniq)((0, _lodash.map)(defaultSettings.gradients, 'gradient'));
  var colors = isGradientSegment ? defaultGradientColors : defaultColors;
  (0, _element.useEffect)(function () {
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
    return _reactNative.Animated.timing(property, {
      toValue: toValue,
      duration: ANIMATION_DURATION,
      easing: _reactNative.Easing.ease,
      useNativeDriver: true
    });
  }

  function performAnimation(color) {
    opacity.setValue(isSelected(color) ? 1 : 0);
    scale.setValue(1);

    _reactNative.Animated.parallel([timingAnimation(scale, 2), timingAnimation(opacity, 1)]).start();
  }

  var scaleInterpolation = scale.interpolate({
    inputRange: [1, 1.5, 2],
    outputRange: [1, 0.7, 1]
  });

  function onColorPress(color) {
    performAnimation(color);
    setColor(color);
  }

  var verticalSeparatorStyle = (0, _compose.usePreferredColorSchemeStyle)(_style.default.verticalSeparator, _style.default.verticalSeparatorDark);
  return (0, _element.createElement)(_reactNative.ScrollView, {
    contentContainerStyle: _style.default.contentContainer,
    style: _style.default.container,
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
    return (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
      onPress: function onPress() {
        return onColorPress(color);
      },
      key: "".concat(color, "-").concat(isSelected(color))
    }, (0, _element.createElement)(_reactNative.Animated.View, {
      style: {
        transform: [{
          scale: scaleValue
        }]
      }
    }, (0, _element.createElement)(_colorIndicator.default, {
      color: color,
      isSelected: isSelected(color),
      opacity: opacity,
      style: _style.default.colorIndicator
    })));
  }), !isGradientSegment && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_reactNative.View, {
    style: verticalSeparatorStyle
  }), (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
    onPress: onCustomPress
  }, (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_colorIndicator.default, {
    withCustomPicker: !isGradientSegment,
    color: customSwatchGradients,
    isSelected: isSelectedCustom(),
    style: _style.default.colorIndicator
  })))));
}

var _default = ColorPalette;
exports.default = _default;
//# sourceMappingURL=index.native.js.map