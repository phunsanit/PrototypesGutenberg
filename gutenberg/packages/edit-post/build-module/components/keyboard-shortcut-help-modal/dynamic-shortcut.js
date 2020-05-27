import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import Shortcut from './shortcut';

function DynamicShortcut(_ref) {
  var name = _ref.name;

  var _useSelect = useSelect(function (select) {
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

  return createElement(Shortcut, {
    keyCombination: keyCombination,
    description: description,
    aliases: aliases
  });
}

export default DynamicShortcut;
//# sourceMappingURL=dynamic-shortcut.js.map