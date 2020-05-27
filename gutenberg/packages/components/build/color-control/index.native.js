"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _colorCell = _interopRequireDefault(require("../mobile/bottom-sheet/color-cell"));

/**
 * Internal dependencies
 */
function ColorControl(_ref) {
  var label = _ref.label,
      help = _ref.help,
      instanceId = _ref.instanceId,
      className = _ref.className,
      onPress = _ref.onPress,
      color = _ref.color,
      props = (0, _objectWithoutProperties2.default)(_ref, ["label", "help", "instanceId", "className", "onPress", "color"]);
  var id = "inspector-color-control-".concat(instanceId);
  return (0, _element.createElement)(_colorCell.default, (0, _extends2.default)({
    label: label,
    id: id,
    help: help,
    className: className,
    "aria-describedby": !!help ? id + '__help' : undefined,
    onPress: onPress,
    color: color
  }, props));
}

var _default = ColorControl;
exports.default = _default;
//# sourceMappingURL=index.native.js.map