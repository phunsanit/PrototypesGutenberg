"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _reactNative = require("react-native");

var _reactNativeLinearGradient = _interopRequireDefault(require("react-native-linear-gradient"));

var _components = require("@wordpress/components");

var _primitives = require("@wordpress/primitives");

var _compose = require("@wordpress/compose");

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
function Gradient(_ref) {
  var gradientValue = _ref.gradientValue,
      style = _ref.style,
      _ref$angleCenter = _ref.angleCenter,
      angleCenter = _ref$angleCenter === void 0 ? {
    x: 0.5,
    y: 0.5
  } : _ref$angleCenter,
      otherProps = (0, _objectWithoutProperties2.default)(_ref, ["gradientValue", "style", "angleCenter"]);

  var _useResizeObserver = (0, _compose.useResizeObserver)(),
      _useResizeObserver2 = (0, _slicedToArray2.default)(_useResizeObserver, 2),
      resizeObserver = _useResizeObserver2[0],
      sizes = _useResizeObserver2[1];

  var _ref2 = sizes || {},
      _ref2$width = _ref2.width,
      width = _ref2$width === void 0 ? 0 : _ref2$width,
      _ref2$height = _ref2.height,
      height = _ref2$height === void 0 ? 0 : _ref2$height;

  var isGradient = _components.colorsUtils.isGradient,
      getGradientType = _components.colorsUtils.getGradientType,
      gradients = _components.colorsUtils.gradients;

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
    return (0, _element.createElement)(_reactNativeLinearGradient.default, (0, _extends2.default)({
      colors: colors,
      useAngle: true,
      angle: angle,
      locations: locations,
      angleCenter: angleCenter,
      style: style
    }, otherProps));
  }

  return (0, _element.createElement)(_reactNative.View, {
    style: [style, _style.default.overflow]
  }, resizeObserver, (0, _element.createElement)(_primitives.SVG, null, (0, _element.createElement)(_primitives.Defs, null, (0, _element.createElement)(_primitives.RadialGradient //eslint-disable-next-line no-restricted-syntax
  , {
    id: "radialGradient",
    gradientUnits: "userSpaceOnUse",
    rx: "70%",
    ry: "70%",
    cy: _reactNative.Platform.OS === 'android' ? width / 2 : '50%'
  }, colorGroup.map(function (group) {
    return (0, _element.createElement)(_primitives.Stop, {
      offset: group[1],
      stopColor: group[0],
      stopOpacity: "1",
      key: "".concat(group[1], "-").concat(group[0])
    });
  }))), (0, _element.createElement)(_primitives.Rect, {
    height: height,
    width: width,
    fill: "url(#radialGradient)"
  })));
}

var _default = Gradient;
exports.default = _default;
//# sourceMappingURL=index.native.js.map