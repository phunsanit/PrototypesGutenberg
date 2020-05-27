import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View, Text, LayoutAnimation } from 'react-native';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { usePreferredColorSchemeStyle } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import ColorPicker from '../../color-picker';
import ColorPalette from '../../color-palette';
import ColorIndicator from '../../color-indicator';
import NavigationHeader from '../bottom-sheet/navigation-header';
import SegmentedControls from '../segmented-control';
import { colorsUtils } from './utils';
import styles from './style.scss';

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

  var _useState = useState(colorValue),
      _useState2 = _slicedToArray(_useState, 2),
      currentValue = _useState2[0],
      setCurrentValue = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isCustomScreen = _useState4[0],
      setIsCustomScreen = _useState4[1];

  var segments = colorsUtils.segments,
      subsheets = colorsUtils.subsheets,
      isGradient = colorsUtils.isGradient;
  var isGradientColor = isGradient(currentValue);
  var selectedSegmentIndex = isGradientColor ? 1 : 0;

  var _useState5 = useState(segments[selectedSegmentIndex]),
      _useState6 = _slicedToArray(_useState5, 2),
      currentSegment = _useState6[0],
      setCurrentSegment = _useState6[1];

  var isSolidSegment = currentSegment === segments[0];
  var horizontalSeparatorStyle = usePreferredColorSchemeStyle(styles.horizontalSeparator, styles.horizontalSeparatorDark);
  useEffect(function () {
    onHardwareButtonPress(function () {
      if (isCustomScreen) {
        onCustomScreenToggle(false);
      } else {
        onReplaceSubsheet(subsheets[0], {}, afterHardwareButtonPress());
      }
    });
  }, [isCustomScreen]);
  useEffect(function () {
    setCurrentSegment(segments[selectedSegmentIndex]);
    shouldDisableBottomSheetMaxHeight(true);
    onCloseBottomSheet(null);
  }, []);

  function afterHardwareButtonPress() {
    onHardwareButtonPress(null);
    shouldDisableBottomSheetMaxHeight(true);
  }

  function onCustomScreenToggle(shouldShow) {
    LayoutAnimation.configureNext(LayoutAnimation.create(300, LayoutAnimation.Types.easeInEaseOut, LayoutAnimation.Properties.opacity));
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
      return createElement(SegmentedControls, {
        segments: segments,
        segmentHandler: function segmentHandler(item) {
          return setCurrentSegment(item);
        },
        selectedIndex: selectedSegmentIndex,
        addonLeft: currentValue && createElement(ColorIndicator, {
          color: currentValue,
          style: styles.colorIndicator
        })
      });
    }

    return createElement(View, {
      style: styles.footer
    }, createElement(View, {
      style: styles.flex
    }, currentValue && createElement(ColorIndicator, {
      color: currentValue,
      style: styles.colorIndicator
    })), createElement(Text, {
      style: styles.selectColorText,
      maxFontSizeMultiplier: 2
    }, __('Select a color')), createElement(View, {
      style: styles.flex
    }));
  }

  return createElement(View, {
    renderToHardwareTextureAndroid: true
  }, isCustomScreen && createElement(View, null, createElement(ColorPicker, {
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
  })), !isCustomScreen && createElement(View, null, createElement(NavigationHeader, {
    screen: label,
    leftButtonOnPress: function leftButtonOnPress() {
      return onReplaceSubsheet(subsheets[0]);
    }
  }), createElement(ColorPalette, {
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
  }), createElement(View, {
    style: horizontalSeparatorStyle
  }), getFooter()));
}

export default ColorSettings;
//# sourceMappingURL=index.native.js.map