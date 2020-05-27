import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View, Platform } from 'react-native';
import RNLinearGradient from 'react-native-linear-gradient';
/**
 * WordPress dependencies
 */

import { colorsUtils } from '@wordpress/components';
import { RadialGradient, Stop, SVG, Defs, Rect } from '@wordpress/primitives';
import { useResizeObserver } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import styles from './style.scss';

function Gradient(_ref) {
  var gradientValue = _ref.gradientValue,
      style = _ref.style,
      _ref$angleCenter = _ref.angleCenter,
      angleCenter = _ref$angleCenter === void 0 ? {
    x: 0.5,
    y: 0.5
  } : _ref$angleCenter,
      otherProps = _objectWithoutProperties(_ref, ["gradientValue", "style", "angleCenter"]);

  var _useResizeObserver = useResizeObserver(),
      _useResizeObserver2 = _slicedToArray(_useResizeObserver, 2),
      resizeObserver = _useResizeObserver2[0],
      sizes = _useResizeObserver2[1];

  var _ref2 = sizes || {},
      _ref2$width = _ref2.width,
      width = _ref2$width === void 0 ? 0 : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? 0 : _ref2$height;

  var isGradient = colorsUtils.isGradient,
      getGradientType = colorsUtils.getGradientType,
      gradients = colorsUtils.gradients;

  if (!gradientValue || !isGradient(gradientValue)) {
    return null;
  }

  var isLinearGradient = getGradientType(gradientValue) === gradients.linear;
  var matchColorGroup = /(rgba|rgb|#)(.+?)[\%]/g;
  var matchDeg = /(\d.+)deg/g;
  var colorGroup = gradientValue.match(matchColorGroup).map(function (color) {
    return color.split(' ');
  });
  var colors = colorGroup.map(function (color) {
    return color[0];
  });
  var locations = colorGroup.map(function (location) {
    return Number(location[1].replace('%', '')) / 100;
  });
  var angle = isLinearGradient && Number(matchDeg.exec(gradientValue)[1]);

  if (isLinearGradient) {
    return createElement(RNLinearGradient, _extends({
      colors: colors,
      useAngle: true,
      angle: angle,
      locations: locations,
      angleCenter: angleCenter,
      style: style
    }, otherProps));
  }

  return createElement(View, {
    style: [style, styles.overflow]
  }, resizeObserver, createElement(SVG, null, createElement(Defs, null, createElement(RadialGradient //eslint-disable-next-line no-restricted-syntax
  , {
    id: "radialGradient",
    gradientUnits: "userSpaceOnUse",
    rx: "70%",
    ry: "70%",
    cy: Platform.OS === 'android' ? width / 2 : '50%'
  }, colorGroup.map(function (group) {
    return createElement(Stop, {
      offset: group[1],
      stopColor: group[0],
      stopOpacity: "1",
      key: "".concat(group[1], "-").concat(group[0])
    });
  }))), createElement(Rect, {
    height: height,
    width: width,
    fill: "url(#radialGradient)"
  })));
}

export default Gradient;
//# sourceMappingURL=index.native.js.map