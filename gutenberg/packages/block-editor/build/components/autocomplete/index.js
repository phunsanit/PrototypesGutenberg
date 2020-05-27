"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withFilteredAutocompleters = withFilteredAutocompleters;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _lodash = require("lodash");

var _hooks = require("@wordpress/hooks");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _context = require("../block-edit/context");

var _block = _interopRequireDefault(require("../../autocompleters/block"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Shared reference to an empty array for cases where it is important to avoid
 * returning a new array reference on every invocation.
 *
 * @type {Array}
 */
var EMPTY_ARRAY = [];
/**
 * Wrap the default Autocomplete component with one that
 * supports a filter hook for customizing its list of autocompleters.
 *
 * This function is exported for unit test.
 *
 * @param  {Function} Autocomplete Original component.
 * @return {Function}              Wrapped component
 */

function withFilteredAutocompleters(Autocomplete) {
  return function (props) {
    var _props$completers = props.completers,
        completers = _props$completers === void 0 ? EMPTY_ARRAY : _props$completers,
        blockName = props.blockName;
    completers = (0, _element.useMemo)(function () {
      if (blockName === (0, _blocks.getDefaultBlockName)()) {
        return completers.concat([_block.default]);
      }

      return completers;
    }, [completers, blockName]);

    if ((0, _hooks.hasFilter)('editor.Autocomplete.completers')) {
      completers = (0, _hooks.applyFilters)('editor.Autocomplete.completers', // Provide copies so filters may directly modify them.
      completers.map(_lodash.clone), props.blockName);
    }

    return (0, _element.createElement)(Autocomplete, (0, _extends2.default)({}, props, {
      completers: completers
    }));
  };
}
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/autocomplete/README.md
 */


var _default = (0, _compose.compose)([(0, _context.withBlockEditContext)(function (_ref) {
  var name = _ref.name;
  return {
    blockName: name
  };
}), withFilteredAutocompleters])(_components.Autocomplete);

exports.default = _default;
//# sourceMappingURL=index.js.map