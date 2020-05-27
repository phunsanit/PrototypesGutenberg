"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _keyboardShortcuts = require("@wordpress/keyboard-shortcuts");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function MenuEditorShortcuts(_ref) {
  var saveBlocks = _ref.saveBlocks;
  (0, _keyboardShortcuts.useShortcut)('core/edit-navigation/save-menu', (0, _element.useCallback)(function (event) {
    event.preventDefault();
    saveBlocks();
  }), {
    bindGlobal: true
  });
  return null;
}

function RegisterMenuEditorShortcuts() {
  var _useDispatch = (0, _data.useDispatch)('core/keyboard-shortcuts'),
      registerShortcut = _useDispatch.registerShortcut;

  (0, _element.useEffect)(function () {
    registerShortcut({
      name: 'core/edit-navigation/save-menu',
      category: 'global',
      description: (0, _i18n.__)('Save the menu currently being edited.'),
      keyCombination: {
        modifier: 'primary',
        character: 's'
      }
    });
  }, [registerShortcut]);
  return null;
}

MenuEditorShortcuts.Register = RegisterMenuEditorShortcuts;
var _default = MenuEditorShortcuts;
exports.default = _default;
//# sourceMappingURL=shortcuts.js.map