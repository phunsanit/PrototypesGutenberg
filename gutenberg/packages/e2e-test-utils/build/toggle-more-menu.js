"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleMoreMenu = toggleMoreMenu;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Toggles the More Menu.
 */
function toggleMoreMenu() {
  return _toggleMoreMenu.apply(this, arguments);
}

function _toggleMoreMenu() {
  _toggleMoreMenu = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return expect(page).toClick('.edit-post-more-menu [aria-label="More tools & options"]');

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _toggleMoreMenu.apply(this, arguments);
}
//# sourceMappingURL=toggle-more-menu.js.map