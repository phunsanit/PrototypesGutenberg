"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function KeyboardShortcuts() {
  var _useDispatch = (0, _data.useDispatch)('core'),
      redo = _useDispatch.redo,
      undo = _useDispatch.undo;

  (0, _keyboardShortcuts.useShortcut)('core/edit-widgets/undo', function (event) {
    undo();
    event.preventDefault();
  }, {
    bindGlobal: true
  });
  (0, _keyboardShortcuts.useShortcut)('core/edit-widgets/redo', function (event) {
    redo();
    event.preventDefault();
  }, {
    bindGlobal: true
  });
  return null;
}

function KeyboardShortcutsRegister() {
  // Registering the shortcuts
  var _useDispatch2 = (0, _data.useDispatch)('core/keyboard-shortcuts'),
      registerShortcut = _useDispatch2.registerShortcut;

  (0, _element.useEffect)(function () {
    registerShortcut({
      name: 'core/edit-widgets/undo',
      category: 'global',
      description: (0, _i18n.__)('Undo your last changes.'),
      keyCombination: {
        modifier: 'primary',
        character: 'z'
      }
    });
    registerShortcut({
      name: 'core/edit-widgets/redo',
      category: 'global',
      description: (0, _i18n.__)('Redo your last undo.'),
      keyCombination: {
        modifier: 'primaryShift',
        character: 'z'
      }
    });
  }, [registerShortcut]);
  return null;
}

KeyboardShortcuts.Register = KeyboardShortcutsRegister;
var _default = KeyboardShortcuts;
exports.default = _default;
//# sourceMappingURL=index.js.map