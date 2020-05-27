"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _modeSwitcher = _interopRequireDefault(require("../mode-switcher"));

var _pluginsMoreMenuGroup = _interopRequireDefault(require("../plugins-more-menu-group"));

var _toolsMoreMenuGroup = _interopRequireDefault(require("../tools-more-menu-group"));

var _optionsMenuItem = _interopRequireDefault(require("../options-menu-item"));

var _writingMenu = _interopRequireDefault(require("../writing-menu"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var POPOVER_PROPS = {
  className: 'edit-post-more-menu__content',
  position: 'bottom left'
};
var TOGGLE_PROPS = {
  tooltipPosition: 'bottom'
};

var MoreMenu = function MoreMenu() {
  return (0, _element.createElement)(_components.DropdownMenu, {
    className: "edit-post-more-menu",
    icon: _icons.moreVertical,
    label: (0, _i18n.__)('More tools & options'),
    popoverProps: POPOVER_PROPS,
    toggleProps: TOGGLE_PROPS
  }, function (_ref) {
    var onClose = _ref.onClose;
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_writingMenu.default, null), (0, _element.createElement)(_modeSwitcher.default, null), (0, _element.createElement)(_pluginsMoreMenuGroup.default.Slot, {
      fillProps: {
        onClose: onClose
      }
    }), (0, _element.createElement)(_toolsMoreMenuGroup.default.Slot, {
      fillProps: {
        onClose: onClose
      }
    }), (0, _element.createElement)(_components.MenuGroup, null, (0, _element.createElement)(_optionsMenuItem.default, null)));
  });
};

var _default = MoreMenu;
exports.default = _default;
//# sourceMappingURL=index.js.map