"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TreeGridCell;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _rovingTabIndexItem = _interopRequireDefault(require("./roving-tab-index-item"));

/**
 * Internal dependencies
 */
function TreeGridCell(_ref) {
  var children = _ref.children,
      props = (0, _objectWithoutProperties2.default)(_ref, ["children"]);
  return (0, _element.createElement)("td", (0, _extends2.default)({}, props, {
    role: "gridcell"
  }), (0, _element.createElement)(_rovingTabIndexItem.default, null, children));
}
//# sourceMappingURL=cell.js.map