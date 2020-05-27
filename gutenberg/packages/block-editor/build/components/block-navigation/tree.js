"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockNavigationTree;

var _element = require("@wordpress/element");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _branch = _interopRequireDefault(require("./branch"));

var _context = require("./context");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Wrap `BlockNavigationRows` with `TreeGrid`. BlockNavigationRows is a
 * recursive component (it renders itself), so this ensures TreeGrid is only
 * present at the very top of the navigation grid.
 *
 * @param {Object} props
 */
function BlockNavigationTree(_ref) {
  var __experimentalWithBlockNavigationSlots = _ref.__experimentalWithBlockNavigationSlots,
      __experimentalWithBlockNavigationBlockSettings = _ref.__experimentalWithBlockNavigationBlockSettings,
      __experimentalWithBlockNavigationBlockSettingsMinLevel = _ref.__experimentalWithBlockNavigationBlockSettingsMinLevel,
      props = (0, _objectWithoutProperties2.default)(_ref, ["__experimentalWithBlockNavigationSlots", "__experimentalWithBlockNavigationBlockSettings", "__experimentalWithBlockNavigationBlockSettingsMinLevel"]);
  var contextValue = (0, _element.useMemo)(function () {
    return {
      __experimentalWithBlockNavigationSlots: __experimentalWithBlockNavigationSlots,
      __experimentalWithBlockNavigationBlockSettings: __experimentalWithBlockNavigationBlockSettings,
      __experimentalWithBlockNavigationBlockSettingsMinLevel: typeof __experimentalWithBlockNavigationBlockSettingsMinLevel === 'number' ? __experimentalWithBlockNavigationBlockSettingsMinLevel : 0
    };
  }, [__experimentalWithBlockNavigationSlots, __experimentalWithBlockNavigationBlockSettings, __experimentalWithBlockNavigationBlockSettingsMinLevel]);
  return (0, _element.createElement)(_components.__experimentalTreeGrid, {
    className: "block-editor-block-navigation-tree",
    "aria-label": (0, _i18n.__)('Block navigation structure')
  }, (0, _element.createElement)(_context.BlockNavigationContext.Provider, {
    value: contextValue
  }, (0, _element.createElement)(_branch.default, props)));
}
//# sourceMappingURL=tree.js.map