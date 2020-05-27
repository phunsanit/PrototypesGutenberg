/**
 * WordPress dependencies
 */
import { useEffect, useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { __ } from '@wordpress/i18n';

function MenuEditorShortcuts(_ref) {
  var saveBlocks = _ref.saveBlocks;
  useShortcut('core/edit-navigation/save-menu', useCallback(function (event) {
    event.preventDefault();
    saveBlocks();
  }), {
    bindGlobal: true
  });
  return null;
}

function RegisterMenuEditorShortcuts() {
  var _useDispatch = useDispatch('core/keyboard-shortcuts'),
      registerShortcut = _useDispatch.registerShortcut;

  useEffect(function () {
    registerShortcut({
      name: 'core/edit-navigation/save-menu',
      category: 'global',
      description: __('Save the menu currently being edited.'),
      keyCombination: {
        modifier: 'primary',
        character: 's'
      }
    });
  }, [registerShortcut]);
  return null;
}

MenuEditorShortcuts.Register = RegisterMenuEditorShortcuts;
export default MenuEditorShortcuts;
//# sourceMappingURL=shortcuts.js.map