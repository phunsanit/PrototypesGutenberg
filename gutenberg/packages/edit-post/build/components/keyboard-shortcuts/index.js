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
function KeyboardShortcuts() {
  var _useSelect = (0, _data.useSelect)(function (select) {
    var settings = select('core/editor').getEditorSettings();
    return {
      getBlockSelectionStart: select('core/block-editor').getBlockSelectionStart,
      getEditorMode: select('core/edit-post').getEditorMode,
      isEditorSidebarOpened: select('core/edit-post').isEditorSidebarOpened,
      richEditingEnabled: settings.richEditingEnabled,
      codeEditingEnabled: settings.codeEditingEnabled
    };
  }),
      getBlockSelectionStart = _useSelect.getBlockSelectionStart,
      getEditorMode = _useSelect.getEditorMode,
      isEditorSidebarOpened = _useSelect.isEditorSidebarOpened,
      richEditingEnabled = _useSelect.richEditingEnabled,
      codeEditingEnabled = _useSelect.codeEditingEnabled;

  var _useDispatch = (0, _data.useDispatch)('core/edit-post'),
      switchEditorMode = _useDispatch.switchEditorMode,
      openGeneralSidebar = _useDispatch.openGeneralSidebar,
      closeGeneralSidebar = _useDispatch.closeGeneralSidebar,
      toggleFeature = _useDispatch.toggleFeature;

  var _useDispatch2 = (0, _data.useDispatch)('core/keyboard-shortcuts'),
      registerShortcut = _useDispatch2.registerShortcut;

  (0, _element.useEffect)(function () {
    registerShortcut({
      name: 'core/edit-post/toggle-mode',
      category: 'global',
      description: (0, _i18n.__)('Switch between visual editor and code editor.'),
      keyCombination: {
        modifier: 'secondary',
        character: 'm'
      }
    });
    registerShortcut({
      name: 'core/edit-post/toggle-fullscreen',
      category: 'global',
      description: (0, _i18n.__)('Toggle fullscreen mode.'),
      keyCombination: {
        modifier: 'secondary',
        character: 'f'
      }
    });
    registerShortcut({
      name: 'core/edit-post/toggle-block-navigation',
      category: 'global',
      description: (0, _i18n.__)('Open the block navigation menu.'),
      keyCombination: {
        modifier: 'access',
        character: 'o'
      }
    });
    registerShortcut({
      name: 'core/edit-post/toggle-sidebar',
      category: 'global',
      description: (0, _i18n.__)('Show or hide the settings sidebar.'),
      keyCombination: {
        modifier: 'primaryShift',
        character: ','
      }
    });
    registerShortcut({
      name: 'core/edit-post/next-region',
      category: 'global',
      description: (0, _i18n.__)('Navigate to the next part of the editor.'),
      keyCombination: {
        modifier: 'ctrl',
        character: '`'
      },
      aliases: [{
        modifier: 'access',
        character: 'n'
      }]
    });
    registerShortcut({
      name: 'core/edit-post/previous-region',
      category: 'global',
      description: (0, _i18n.__)('Navigate to the previous part of the editor.'),
      keyCombination: {
        modifier: 'ctrlShift',
        character: '`'
      },
      aliases: [{
        modifier: 'access',
        character: 'p'
      }]
    });
    registerShortcut({
      name: 'core/edit-post/keyboard-shortcuts',
      category: 'main',
      description: (0, _i18n.__)('Display these keyboard shortcuts.'),
      keyCombination: {
        modifier: 'access',
        character: 'h'
      }
    });
  }, []);
  (0, _keyboardShortcuts.useShortcut)('core/edit-post/toggle-mode', function () {
    switchEditorMode(getEditorMode() === 'visual' ? 'text' : 'visual');
  }, {
    bindGlobal: true,
    isDisabled: !richEditingEnabled || !codeEditingEnabled
  });
  (0, _keyboardShortcuts.useShortcut)('core/edit-post/toggle-fullscreen', function () {
    toggleFeature('fullscreenMode');
  }, {
    bindGlobal: true
  });
  (0, _keyboardShortcuts.useShortcut)('core/edit-post/toggle-sidebar', function (event) {
    // This shortcut has no known clashes, but use preventDefault to prevent any
    // obscure shortcuts from triggering.
    event.preventDefault();

    if (isEditorSidebarOpened()) {
      closeGeneralSidebar();
    } else {
      var sidebarToOpen = getBlockSelectionStart() ? 'edit-post/block' : 'edit-post/document';
      openGeneralSidebar(sidebarToOpen);
    }
  }, {
    bindGlobal: true
  });
  return null;
}

var _default = KeyboardShortcuts;
exports.default = _default;
//# sourceMappingURL=index.js.map