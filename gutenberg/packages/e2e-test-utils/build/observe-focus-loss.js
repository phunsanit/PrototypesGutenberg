"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableFocusLossObservation = enableFocusLossObservation;
exports.disableFocusLossObservation = disableFocusLossObservation;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

/**
 * Adds an event listener to the document which throws an error if there is a
 * loss of focus.
 */
function enableFocusLossObservation() {
  return _enableFocusLossObservation.apply(this, arguments);
}
/**
 * Removes the focus loss listener that `enableFocusLossObservation()` adds.
 */


function _enableFocusLossObservation() {
  _enableFocusLossObservation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return page.evaluate(function () {
              if (window._detectFocusLoss) {
                document.body.removeEventListener('focusout', window._detectFocusLoss);
              }

              window._detectFocusLoss = function (event) {
                if (!event.relatedTarget) {
                  throw new Error('Unexpected focus loss');
                }
              };

              document.body.addEventListener('focusout', window._detectFocusLoss);
            });

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _enableFocusLossObservation.apply(this, arguments);
}

function disableFocusLossObservation() {
  return _disableFocusLossObservation.apply(this, arguments);
}

function _disableFocusLossObservation() {
  _disableFocusLossObservation = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return page.evaluate(function () {
              if (window._detectFocusLoss) {
                document.body.removeEventListener('focusout', window._detectFocusLoss);
              }
            });

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _disableFocusLossObservation.apply(this, arguments);
}
//# sourceMappingURL=observe-focus-loss.js.map