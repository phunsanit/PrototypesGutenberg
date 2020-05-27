"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "DotTip", {
  enumerable: true,
  get: function get() {
    return _dotTip.default;
  }
});

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

require("./store");

var _dotTip = _interopRequireDefault(require("./components/dot-tip"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
(0, _deprecated.default)('wp.nux', {
  hint: 'wp.components.Guide can be used to show a user guide.'
});
//# sourceMappingURL=index.js.map