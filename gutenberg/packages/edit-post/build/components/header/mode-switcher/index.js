"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Set of available mode options.
 *
 * @type {Array}
 */
var MODES = [{
  value: 'visual',
  label: (0, _i18n.__)('Visual editor')
}, {
  value: 'text',
  label: (0, _i18n.__)('Code editor')
}];

function ModeSwitcher() {
  var _useSelect = (0, _data.useSelect)(function (select) {
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

  var _useDispatch = (0, _data.useDispatch)('core/edit-post'),
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
  return (0, _element.createElement)(_components.MenuGroup, {
    label: (0, _i18n.__)('Editor')
  }, (0, _element.createElement)(_components.MenuItemsChoice, {
    choices: choices,
    value: mode,
    onSelect: switchEditorMode
  }));
}

var _default = ModeSwitcher;
exports.default = _default;
//# sourceMappingURL=index.js.map