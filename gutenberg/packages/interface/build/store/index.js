"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _data = require("@wordpress/data");

var _reducer = _interopRequireDefault(require("./reducer"));

var actions = _interopRequireWildcard(require("./actions"));

var selectors = _interopRequireWildcard(require("./selectors"));

var _constants = require("./constants");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var store = (0, _data.registerStore)(_constants.STORE_KEY, {
  reducer: _reducer.default,
  actions: actions,
  selectors: selectors,
  persist: ['enableItems']
});
var _default = store;
exports.default = _default;
//# sourceMappingURL=index.js.map