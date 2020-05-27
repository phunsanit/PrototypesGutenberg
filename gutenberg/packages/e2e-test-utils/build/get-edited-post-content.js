"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEditedPostContent = getEditedPostContent;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _wpDataSelect = require("./wp-data-select");

/**
 * Internal dependencies
 */

/**
 * Returns a promise which resolves with the edited post content (HTML string).
 *
 * @return {Promise} Promise resolving with post content markup.
 */
function getEditedPostContent() {
  return _getEditedPostContent.apply(this, arguments);
}

function _getEditedPostContent() {
  _getEditedPostContent = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", (0, _wpDataSelect.wpDataSelect)('core/editor', 'getEditedPostContent'));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getEditedPostContent.apply(this, arguments);
}
//# sourceMappingURL=get-edited-post-content.js.map