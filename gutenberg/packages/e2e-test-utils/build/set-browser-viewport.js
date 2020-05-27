"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setBrowserViewport = setBrowserViewport;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _waitForWindowDimensions = require("./wait-for-window-dimensions");

/**
 * Internal dependencies
 */

/**
 * Named viewport options.
 *
 * @typedef {"large"|"medium"|"small"} WPDimensionsName
 */

/**
 * Viewport dimensions object.
 *
 * @typedef {Object} WPViewportDimensions
 *
 * @property {number} width  Width, in pixels.
 * @property {number} height Height, in pixels.
 */

/**
 * Predefined viewport dimensions to reference by name.
 *
 * @enum {WPViewportDimensions}
 *
 * @type {Object<WPDimensionsName,WPViewportDimensions>}
 */
var PREDEFINED_DIMENSIONS = {
  large: {
    width: 960,
    height: 700
  },
  medium: {
    width: 768,
    height: 700
  },
  small: {
    width: 600,
    height: 700
  }
};
/**
 * Valid argument argument type from which to derive viewport dimensions.
 *
 * @typedef {WPDimensionsName|WPViewportDimensions} WPViewport
 */

/**
 * Sets browser viewport to specified type.
 *
 * @param {WPViewport} viewport Viewport name or dimensions object to assign.
 */

function setBrowserViewport(_x) {
  return _setBrowserViewport.apply(this, arguments);
}

function _setBrowserViewport() {
  _setBrowserViewport = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(viewport) {
    var dimensions;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dimensions = typeof viewport === 'string' ? PREDEFINED_DIMENSIONS[viewport] : viewport;
            _context.next = 3;
            return page.setViewport(dimensions);

          case 3:
            _context.next = 5;
            return (0, _waitForWindowDimensions.waitForWindowDimensions)(dimensions.width, dimensions.height);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _setBrowserViewport.apply(this, arguments);
}
//# sourceMappingURL=set-browser-viewport.js.map