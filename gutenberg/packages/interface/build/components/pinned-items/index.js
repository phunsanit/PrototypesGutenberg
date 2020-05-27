"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function PinnedItems(_ref) {
  var scope = _ref.scope,
      props = (0, _objectWithoutProperties2.default)(_ref, ["scope"]);
  return (0, _element.createElement)(_components.Fill, (0, _extends2.default)({
    name: "PinnedItems/".concat(scope)
  }, props));
}

function PinnedItemsSlot(_ref2) {
  var scope = _ref2.scope,
      className = _ref2.className,
      props = (0, _objectWithoutProperties2.default)(_ref2, ["scope", "className"]);
  return (0, _element.createElement)(_components.Slot, (0, _extends2.default)({
    name: "PinnedItems/".concat(scope)
  }, props), function (fills) {
    return !(0, _lodash.isEmpty)(fills) && (0, _element.createElement)("div", {
      className: (0, _classnames.default)(className, 'interface-pinned-items')
    }, fills);
  });
}

PinnedItems.Slot = PinnedItemsSlot;
var _default = PinnedItems;
exports.default = _default;
//# sourceMappingURL=index.js.map