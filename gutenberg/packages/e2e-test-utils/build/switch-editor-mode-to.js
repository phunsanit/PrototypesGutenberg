"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchEditorModeTo = switchEditorModeTo;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toggleMoreMenu = require("./toggle-more-menu");

/**
 * Internal dependencies
 */

/**
 * Switches editor mode.
 *
 * @param {string} mode String editor mode.
 */
function switchEditorModeTo(_x) {
  return _switchEditorModeTo.apply(this, arguments);
}

function _switchEditorModeTo() {
  _switchEditorModeTo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(mode) {
    var _yield$page$$x, _yield$page$$x2, button;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _toggleMoreMenu.toggleMoreMenu)();

          case 2:
            _context.next = 4;
            return page.$x("//button[contains(text(), '".concat(mode, " editor')]"));

          case 4:
            _yield$page$$x = _context.sent;
            _yield$page$$x2 = (0, _slicedToArray2.default)(_yield$page$$x, 1);
            button = _yield$page$$x2[0];
            _context.next = 9;
            return button.click('button');

          case 9:
            _context.next = 11;
            return (0, _toggleMoreMenu.toggleMoreMenu)();

          case 11:
            if (!(mode === 'Code')) {
              _context.next = 14;
              break;
            }

            _context.next = 14;
            return page.waitForSelector('.editor-post-text-editor');

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _switchEditorModeTo.apply(this, arguments);
}
//# sourceMappingURL=switch-editor-mode-to.js.map