"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformBlockTo = transformBlockTo;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Converts editor's block type.
 *
 * @param {string} name Block name.
 */
function transformBlockTo(_x) {
  return _transformBlockTo.apply(this, arguments);
}

function _transformBlockTo() {
  _transformBlockTo = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(name) {
    var switcherToggle, insertButton, BLOCK_SELECTOR, BLOCK_NAME_SELECTOR;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.mouse.move(0, 0);

          case 2:
            _context.next = 4;
            return page.mouse.move(10, 10);

          case 4:
            _context.next = 6;
            return page.waitForSelector('.block-editor-block-switcher__toggle');

          case 6:
            switcherToggle = _context.sent;
            _context.next = 9;
            return switcherToggle.click();

          case 9:
            _context.next = 11;
            return page.$x("//*[contains(@class, \"block-editor-block-switcher__popover\")]//button[.='".concat(name, "']"));

          case 11:
            insertButton = _context.sent[0];
            _context.next = 14;
            return insertButton.evaluate(function (element) {
              return element.scrollIntoView();
            });

          case 14:
            _context.next = 16;
            return insertButton.click();

          case 16:
            // Wait for the transformed block to appear.
            BLOCK_SELECTOR = '.block-editor-block-list__block';
            BLOCK_NAME_SELECTOR = "[data-title=\"".concat(name, "\"]");
            _context.next = 20;
            return page.waitForSelector("".concat(BLOCK_SELECTOR).concat(BLOCK_NAME_SELECTOR));

          case 20:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _transformBlockTo.apply(this, arguments);
}
//# sourceMappingURL=transform-block-to.js.map