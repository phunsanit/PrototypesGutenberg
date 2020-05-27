"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _reactNative = require("react-native");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _colorPicker = _interopRequireDefault(require("../../color-picker"));

var _colorPalette = _interopRequireDefault(require("../../color-palette"));

var _colorIndicator = _interopRequireDefault(require("../../color-indicator"));

var _navigationHeader = _interopRequireDefault(require("../bottom-sheet/navigation-header"));

var _segmentedControl = _interopRequireDefault(require("../segmented-control"));

var _utils = require("./utils");

var _style = _interopRequireDefault(require("./style.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function ColorSettings(_ref) {
  var label = _ref.label,
      onColorChange = _ref.onColorChange,
      onGradientChange = _ref.onGradientChange,
      colorValue = _ref.colorValue,
      onReplaceSubsheet = _ref.onReplaceSubsheet,
      shouldEnableBottomSheetScroll = _ref.shouldEnableBottomSheetScroll,
      shouldDisableBottomSheetMaxHeight = _ref.shouldDisableBottomSheetMaxHeight,
      isBottomSheetContentScrolling = _ref.isBottomSheetContentScrolling,
      onCloseBottomSheet = _ref.onCloseBottomSheet,
      onHardwareButtonPress = _ref.onHardwareButtonPress,
      defaultSettings = _ref.defaultSettings;

  var _useState = (0, _element.useState)(colorValue),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      currentValue = _useState2[0],
      setCurrentValue = _useState2[1];

  var _useState3 = (0, _element.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isCustomScreen = _useState4[0],
      setIsCustomScreen = _useState4[1];

  var segments = _utils.colorsUtils.segments,
      subsheets = _utils.colorsUtils.subsheets,
      isGradient = _utils.colorsUtils.isGradient;
  var isGradientColor = isGradient(currentValue);
  var selectedSegmentIndex = isGradientColor ? 1 : 0;

  var _useState5 = (0, _element.useState)(segments[selectedSegmentIndex]),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      currentSegment = _useState6[0],
      setCurrentSegment = _useState6[1];

  var isSolidSegment = currentSegment === segments[0];
  var horizontalSeparatorStyle = (0, _compose.usePreferredColorSchemeStyle)(_style.default.horizontalSeparator, _style.default.horizontalSeparatorDark);
  (0, _element.useEffect)(function () {
    onHardwareButtonPress(function () {
      if (isCustomScreen) {
        onCustomScreenToggle(false);
      } else {
        onReplaceSubsheet(subsheets[0], {}, afterHardwareButtonPress());
      }
    });
  }, [isCustomScreen]);
  (0, _element.useEffect)(function () {
    setCurrentSegment(segments[selectedSegmentIndex]);
    shouldDisableBottomSheetMaxHeight(true);
    onCloseBottomSheet(null);
  }, []);

  function afterHardwareButtonPress() {
    onHardwareButtonPress(null);
    shouldDisableBottomSheetMaxHeight(true);
  }

  function onCustomScreenToggle(shouldShow) {
    _reactNative.LayoutAnimation.configureNext(_reactNative.LayoutAnimation.create(300, _reactNative.LayoutAnimation.Types.easeInEaseOut, _reactNative.LayoutAnimation.Properties.opacity));

    setIsCustomScreen(shouldShow);
  }

  function setColor(color) {
    setCurrentValue(color);

    if (isSolidSegment && onColorChange && onGradientChange) {
      onColorChange(color);
      onGradientChange('');
    } else if (isSolidSegment && onColorChange) {
      onColorChange(color);
    } else if (!isSolidSegment && onGradientChange) {
      onGradientChange(color);
    }
  }

  function getFooter() {
    if (onGradientChange) {
      return (0, _element.createElement)(_segmentedControl.default, {
        segments: segments,
        segmentHandler: function segmentHandler(item) {
          return setCurrentSegment(item);
        },
        selectedIndex: selectedSegmentIndex,
        addonLeft: currentValue && (0, _element.createElement)(_colorIndicator.default, {
          color: currentValue,
          style: _style.default.colorIndicator
        })
      });
    }

    return (0, _element.createElement)(_reactNative.View, {
      style: _style.default.footer
    }, (0, _element.createElement)(_reactNative.View, {
      style: _style.default.flex
    }, currentValue && (0, _element.createElement)(_colorIndicator.default, {
      color: currentValue,
      style: _style.default.colorIndicator
    })), (0, _element.createElement)(_reactNative.Text, {
      style: _style.default.selectColorText,
      maxFontSizeMultiplier: 2
    }, (0, _i18n.__)('Select a color')), (0, _element.createElement)(_reactNative.View, {
      style: _style.default.flex
    }));
  }

  return (0, _element.createElement)(_reactNative.View, {
    renderToHardwareTextureAndroid: true
  }, isCustomScreen && (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_colorPicker.default, {
    shouldEnableBottomSheetScroll: shouldEnableBottomSheetScroll,
    shouldDisableBottomSheetMaxHeight: shouldDisableBottomSheetMaxHeight,
    setColor: setColor,
    activeColor: currentValue,
    isGradientColor: isGradientColor,
    onNavigationBack: function onNavigationBack() {
      onCustomScreenToggle(false);
    },
    onCloseBottomSheet: onCloseBottomSheet,
    isBottomSheetContentScrolling: isBottomSheetContentScrolling
  })), !isCustomScreen && (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_navigationHeader.default, {
    screen: label,
    leftButtonOnPress: function leftButtonOnPress() {
      return onReplaceSubsheet(subsheets[0]);
    }
  }), (0, _element.createElement)(_colorPalette.default, {
    setColor: setColor,
    activeColor: currentValue,
    isGradientColor: isGradientColor,
    currentSegment: currentSegment,
    isCustomScreen: isCustomScreen,
    onCustomPress: function onCustomPress() {
      onCustomScreenToggle(true);
    },
    shouldEnableBottomSheetScroll: shouldEnableBottomSheetScroll,
    defaultSettings: defaultSettings
  }), (0, _element.createElement)(_reactNative.View, {
    style: horizontalSeparatorStyle
  }), getFooter()));
}

var _default = ColorSettings;
exports.default = _default;
//# sourceMappingURL=index.native.js.map