"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlockInspectorButton = BlockInspectorButton;
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function BlockInspectorButton(_ref) {
  var _ref$onClick = _ref.onClick,
      _onClick = _ref$onClick === void 0 ? _lodash.noop : _ref$onClick,
      _ref$small = _ref.small,
      small = _ref$small === void 0 ? false : _ref$small,
      speak = _ref.speak;

  var _useSelect = (0, _data.useSelect)(function (select) {
    return {
      shortcut: select('core/keyboard-shortcuts').getShortcutRepresentation('core/edit-post/toggle-sidebar'),
      areAdvancedSettingsOpened: select('core/edit-post').getActiveGeneralSidebarName() === 'edit-post/block'
    };
  }, []),
      shortcut = _useSelect.shortcut,
      areAdvancedSettingsOpened = _useSelect.areAdvancedSettingsOpened;

  var _useDispatch = (0, _data.useDispatch)('core/edit-post'),
      openGeneralSidebar = _useDispatch.openGeneralSidebar,
      closeGeneralSidebar = _useDispatch.closeGeneralSidebar;

  var speakMessage = function speakMessage() {
    if (areAdvancedSettingsOpened) {
      speak((0, _i18n.__)('Block settings closed'));
    } else {
      speak((0, _i18n.__)('Additional settings are now available in the Editor block settings sidebar'));
    }
  };

  var label = areAdvancedSettingsOpened ? (0, _i18n.__)('Hide Block Settings') : (0, _i18n.__)('Show Block Settings');
  return (0, _element.createElement)(_components.MenuItem, {
    onClick: function onClick() {
      if (areAdvancedSettingsOpened) {
        closeGeneralSidebar();
      } else {
        openGeneralSidebar('edit-post/block');
        speakMessage();

        _onClick();
      }
    },
    shortcut: shortcut
  }, !small && label);
}

var _default = (0, _components.withSpokenMessages)(BlockInspectorButton);

exports.default = _default;
//# sourceMappingURL=block-inspector-button.js.map