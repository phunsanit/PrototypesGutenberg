import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";

/**
 * Internal dependencies
 */
import { pressKeyWithModifier } from './press-key-with-modifier'; // This selector is written to support the current and old inserter markup
// because the performance tests need to be able to run across versions.

var INSERTER_SEARCH_SELECTOR = '.block-editor-inserter__search-input,input.block-editor-inserter__search';
/**
 * Opens the global block inserter.
 */

export function openGlobalBlockInserter() {
  return _openGlobalBlockInserter.apply(this, arguments);
}

function _openGlobalBlockInserter() {
  _openGlobalBlockInserter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var tab;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return isGlobalInserterOpen();

          case 2:
            if (!_context.sent) {
              _context.next = 11;
              break;
            }

            _context.next = 5;
            return page.$('.block-editor-inserter__tabs .components-tab-panel__tabs-item:nth-of-type(1):not(.is-active)');

          case 5:
            tab = _context.sent;

            if (!tab) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return tab.click();

          case 9:
            _context.next = 15;
            break;

          case 11:
            _context.next = 13;
            return toggleGlobalBlockInserter();

          case 13:
            _context.next = 15;
            return page.waitForSelector('.block-editor-inserter__menu');

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _openGlobalBlockInserter.apply(this, arguments);
}

export function closeGlobalBlockInserter() {
  return _closeGlobalBlockInserter.apply(this, arguments);
}

function _closeGlobalBlockInserter() {
  _closeGlobalBlockInserter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return isGlobalInserterOpen();

          case 2:
            if (!_context2.sent) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return toggleGlobalBlockInserter();

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _closeGlobalBlockInserter.apply(this, arguments);
}

function isGlobalInserterOpen() {
  return _isGlobalInserterOpen.apply(this, arguments);
}

function _isGlobalInserterOpen() {
  _isGlobalInserterOpen = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return page.evaluate(function () {
              return !!document.querySelector('.edit-post-header [aria-label="Add block"].is-pressed, .edit-site-header [aria-label="Add block"].is-pressed');
            });

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _isGlobalInserterOpen.apply(this, arguments);
}

function toggleGlobalBlockInserter() {
  return _toggleGlobalBlockInserter.apply(this, arguments);
}
/**
 * Search for block in the global inserter
 *
 * @param {string} searchTerm The text to search the inserter for.
 */


function _toggleGlobalBlockInserter() {
  _toggleGlobalBlockInserter = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4() {
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return page.click('.edit-post-header [aria-label="Add block"], .edit-site-header [aria-label="Add block"]');

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _toggleGlobalBlockInserter.apply(this, arguments);
}

export function searchForBlock(_x) {
  return _searchForBlock.apply(this, arguments);
}
/**
 * Search for pattern in the global inserter
 *
 * @param {string} searchTerm The text to search the inserter for.
 */

function _searchForBlock() {
  _searchForBlock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee5(searchTerm) {
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return openGlobalBlockInserter();

          case 2:
            _context5.next = 4;
            return page.focus(INSERTER_SEARCH_SELECTOR);

          case 4:
            _context5.next = 6;
            return pressKeyWithModifier('primary', 'a');

          case 6:
            _context5.next = 8;
            return page.keyboard.type(searchTerm);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _searchForBlock.apply(this, arguments);
}

export function searchForPattern(_x2) {
  return _searchForPattern.apply(this, arguments);
}
/**
 * Opens the inserter, searches for the given term, then selects the first
 * result that appears. It then waits briefly for the block list to update.
 *
 * @param {string} searchTerm The text to search the inserter for.
 */

function _searchForPattern() {
  _searchForPattern = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee6(searchTerm) {
    var _yield$page$$x, _yield$page$$x2, tab;

    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return openGlobalBlockInserter();

          case 2:
            _context6.next = 4;
            return page.$x('//div[contains(@class, "block-editor-inserter__tabs")]//button[.="Patterns"]');

          case 4:
            _yield$page$$x = _context6.sent;
            _yield$page$$x2 = _slicedToArray(_yield$page$$x, 1);
            tab = _yield$page$$x2[0];
            _context6.next = 9;
            return tab.click();

          case 9:
            _context6.next = 11;
            return page.focus(INSERTER_SEARCH_SELECTOR);

          case 11:
            _context6.next = 13;
            return pressKeyWithModifier('primary', 'a');

          case 13:
            _context6.next = 15;
            return page.keyboard.type(searchTerm);

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _searchForPattern.apply(this, arguments);
}

export function insertBlock(_x3) {
  return _insertBlock.apply(this, arguments);
}
/**
 * Opens the inserter, searches for the given pattern, then selects the first
 * result that appears. It then waits briefly for the block list to update.
 *
 * @param {string} searchTerm The text to search the inserter for.
 */

function _insertBlock() {
  _insertBlock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee7(searchTerm) {
    var insertButton;
    return _regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return searchForBlock(searchTerm);

          case 2:
            _context7.next = 4;
            return page.$x("//button//span[contains(text(), '".concat(searchTerm, "')]"));

          case 4:
            insertButton = _context7.sent[0];
            _context7.next = 7;
            return insertButton.click();

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _insertBlock.apply(this, arguments);
}

export function insertPattern(_x4) {
  return _insertPattern.apply(this, arguments);
}

function _insertPattern() {
  _insertPattern = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee8(searchTerm) {
    var insertButton;
    return _regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return searchForPattern(searchTerm);

          case 2:
            _context8.next = 4;
            return page.$x("//div[@role = 'button']//div[contains(text(), '".concat(searchTerm, "')]"));

          case 4:
            insertButton = _context8.sent[0];
            _context8.next = 7;
            return insertButton.click();

          case 7:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _insertPattern.apply(this, arguments);
}
//# sourceMappingURL=inserter.js.map