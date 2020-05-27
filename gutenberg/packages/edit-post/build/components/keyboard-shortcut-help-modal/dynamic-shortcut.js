"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _shortcut = _interopRequireDefault(require("./shortcut"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function DynamicShortcut(_ref) {
  var name = _ref.name;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/keyboard-shortcuts'),
        getShortcutKeyCombination = _select.getShortcutKeyCombination,
        getShortcutDescription = _select.getShortcutDescription,
        getShortcutAliases = _select.getShortcutAliases;

    return {
      keyCombination: getShortcutKeyCombination(name),
      aliases: getShortcutAliases(name),
      description: getShortcutDescription(name)
    };
  }),
      keyCombination = _useSelect.keyCombination,
      description = _useSelect.description,
      aliases = _useSelect.aliases;

  if (!keyCombination) {
    return null;
  }

  return (0, _element.createElement)(_shortcut.default, {
    keyCombination: keyCombination,
    description: description,
    aliases: aliases
  });
}

var _default = DynamicShortcut;
exports.default = _default;
//# sourceMappingURL=dynamic-shortcut.js.map