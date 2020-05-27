"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enablePrePublishChecks = enablePrePublishChecks;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toggleScreenOption = require("./toggle-screen-option");

var _toggleMoreMenu = require("./toggle-more-menu");

/**
 * Internal dependencies
 */

/**
 * Enables Pre-publish checks.
 */
function enablePrePublishChecks() {
  return _enablePrePublishChecks.apply(this, arguments);
}

function _enablePrePublishChecks() {
  _enablePrePublishChecks = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _toggleScreenOption.toggleScreenOption)('Pre-publish checks', true);

          case 2:
            _context.next = 4;
            return (0, _toggleMoreMenu.toggleMoreMenu)();

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _enablePrePublishChecks.apply(this, arguments);
}
//# sourceMappingURL=enable-pre-publish-checks.js.map