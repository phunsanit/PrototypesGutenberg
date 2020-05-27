/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { useShortcut } from '@wordpress/keyboard-shortcuts';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

function KeyboardShortcuts() {
  var _useDispatch = useDispatch('core'),
      redo = _useDispatch.redo,
      undo = _useDispatch.undo;

  useShortcut('core/edit-site/undo', function (event) {
    undo();
    event.preventDefault();
  }, {
    bindGlobal: true
  });
  useShortcut('core/edit-site/redo', function (event) {
    redo();
    event.preventDefault();
  }, {
    bindGlobal: true
  });
  return null;
}

function KeyboardShortcutsRegister() {
  // Registering the shortcuts
  var _useDispatch2 = useDispatch('core/keyboard-shortcuts'),
      registerShortcut = _useDispatch2.registerShortcut;

  useEffect(function () {
    registerShortcut({
      name: 'core/edit-site/undo',
      category: 'global',
      description: __('Undo your last changes.'),
      keyCombination: {
        modifier: 'primary',
        character: 'z'
      }
    });
    registerShortcut({
      name: 'core/edit-site/redo',
      category: 'global',
      description: __('Redo your last undo.'),
      keyCombination: {
        modifier: 'primaryShift',
        character: 'z'
      }
    });
  }, [registerShortcut]);
  return null;
}

KeyboardShortcuts.Register = KeyboardShortcutsRegister;
export default KeyboardShortcuts;
//# sourceMappingURL=index.js.map