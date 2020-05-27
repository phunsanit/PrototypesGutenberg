"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axePuppeteer = _interopRequireDefault(require("axe-puppeteer"));

/**
 * External dependencies
 */

/** @typedef {import('puppeteer').Page} Page */

/** @typedef {import('axe-core').RunOptions} RunOptions */

/** @typedef {import('axe-core').Spec} Spec */

/**
 * Formats the list of violations object returned by Axe analysis.
 *
 * @param {Object} violations The object with the errors found by Axe.
 *
 * @return {string} The user friendly message to display when the matcher fails.
 */
function formatViolations(violations) {
  return violations.map(function (_ref) {
    var help = _ref.help,
        helpUrl = _ref.helpUrl,
        id = _ref.id,
        nodes = _ref.nodes;
    var output = "Rule: \"".concat(id, "\" (").concat(help, ")\n") + "Help: ".concat(helpUrl, "\n") + 'Affected Nodes:\n';
    nodes.forEach(function (node) {
      if (node.any.length) {
        output += "  ".concat(node.target, "\n");
        output += '    Fix ANY of the following:\n';
        node.any.forEach(function (item) {
          output += "    - ".concat(item.message, "\n");
        });
      }

      if (node.all.length) {
        output += "  ".concat(node.target, "\n");
        output += '    Fix ALL of the following:\n';
        node.all.forEach(function (item) {
          output += "      - ".concat(item.message, ".\n");
        });
      }

      if (node.none.length) {
        output += "  ".concat(node.target, "\n");
        output += '    Fix ALL of the following:\n';
        node.none.forEach(function (item) {
          output += "      - ".concat(item.message, ".\n");
        });
      }
    });
    return output;
  }).join('\n');
}
/**
 * Defines async matcher to check whether a given Puppeteer's page instance passes Axe accessibility tests.
 *
 * @see https://www.deque.com/axe/
 * It is possible to pass optional Axe API options to perform customized check.
 *
 * @see https://github.com/dequelabs/axe-puppeteer
 *
 * @param {Page}          page                 Puppeteer's page instance.
 * @param {?Object}       params               Optional params that allow better control over Axe API.
 * @param {?string|Array} params.include       CSS selector(s) to add to the list of elements
 *                                             to include in analysis.
 * @param {?string|Array} params.exclude       CSS selector(s) to add to the list of elements
 *                                             to exclude from analysis.
 * @param {?Array}        params.disabledRules The list of Axe rules to skip from verification.
 * @param {?RunOptions}   params.options       A flexible way to configure how Axe run operates,
 *                                             see https://github.com/dequelabs/axe-core/blob/master/doc/API.md#options-parameter.
 * @param {?Spec}         params.config        Axe configuration object,
 *                                             see https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure.
 *
 * @return {Object} A matcher object with two keys `pass` and `message`.
 */


function toPassAxeTests(_x) {
  return _toPassAxeTests.apply(this, arguments);
}

function _toPassAxeTests() {
  _toPassAxeTests = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(page) {
    var _this = this;

    var _ref2,
        include,
        exclude,
        disabledRules,
        options,
        config,
        axe,
        _yield$axe$analyze,
        violations,
        pass,
        message,
        _args = arguments;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref2 = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, include = _ref2.include, exclude = _ref2.exclude, disabledRules = _ref2.disabledRules, options = _ref2.options, config = _ref2.config;
            axe = new _axePuppeteer.default(page);

            if (include) {
              axe.include(include);
            }

            if (exclude) {
              axe.exclude(exclude);
            }

            if (options) {
              axe.options(options);
            }

            if (disabledRules) {
              axe.disableRules(disabledRules);
            }

            if (config) {
              axe.configure(config);
            }

            _context.next = 9;
            return axe.analyze();

          case 9:
            _yield$axe$analyze = _context.sent;
            violations = _yield$axe$analyze.violations;
            pass = violations.length === 0;
            message = pass ? function () {
              return _this.utils.matcherHint('.not.toPassAxeTests') + '\n\n' + 'Expected page to contain accessibility check violations.\n' + 'No violations found.';
            } : function () {
              return _this.utils.matcherHint('.toPassAxeTests') + '\n\n' + 'Expected page to pass Axe accessibility tests.\n' + 'Violations found:\n' + _this.utils.RECEIVED_COLOR(formatViolations(violations));
            };
            return _context.abrupt("return", {
              message: message,
              pass: pass
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _toPassAxeTests.apply(this, arguments);
}

expect.extend({
  toPassAxeTests: toPassAxeTests
});
//# sourceMappingURL=index.js.map