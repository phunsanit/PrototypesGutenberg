"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleOfflineMode = toggleOfflineMode;
exports.isOfflineMode = isOfflineMode;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _isOfflineMode = false;

function toggleOfflineMode(_x) {
  return _toggleOfflineMode.apply(this, arguments);
}

function _toggleOfflineMode() {
  _toggleOfflineMode = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(isOffline) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _isOfflineMode = isOffline;
            page.setOfflineMode(isOffline);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _toggleOfflineMode.apply(this, arguments);
}

function isOfflineMode() {
  return _isOfflineMode;
}
//# sourceMappingURL=offline-mode.js.map