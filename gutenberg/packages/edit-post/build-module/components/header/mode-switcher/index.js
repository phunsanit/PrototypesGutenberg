import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { MenuItemsChoice, MenuGroup } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
/**
 * Set of available mode options.
 *
 * @type {Array}
 */

var MODES = [{
  value: 'visual',
  label: __('Visual editor')
}, {
  value: 'text',
  label: __('Code editor')
}];

function ModeSwitcher() {
  var _useSelect = useSelect(function (select) {
    return {
      shortcut: select('core/keyboard-shortcuts').getShortcutRepresentation('core/edit-post/toggle-mode'),
      isRichEditingEnabled: select('core/editor').getEditorSettings().richEditingEnabled,
      isCodeEditingEnabled: select('core/editor').getEditorSettings().codeEditingEnabled,
      mode: select('core/edit-post').getEditorMode()
    };
  }, []),
      shortcut = _useSelect.shortcut,
      isRichEditingEnabled = _useSelect.isRichEditingEnabled,
      isCodeEditingEnabled = _useSelect.isCodeEditingEnabled,
      mode = _useSelect.mode;

  var _useDispatch = useDispatch('core/edit-post'),
      switchEditorMode = _useDispatch.switchEditorMode;

  if (!isRichEditingEnabled || !isCodeEditingEnabled) {
    return null;
  }

  var choices = MODES.map(function (choice) {
    if (choice.value !== mode) {
      return _objectSpread({}, choice, {
        shortcut: shortcut
      });
    }

    return choice;
  });
  return createElement(MenuGroup, {
    label: __('Editor')
  }, createElement(MenuItemsChoice, {
    choices: choices,
    value: mode,
    onSelect: switchEditorMode
  }));
}

export default ModeSwitcher;
//# sourceMappingURL=index.js.map