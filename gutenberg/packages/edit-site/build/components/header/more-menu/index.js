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

var _featureToggle = _interopRequireDefault(require("../feature-toggle"));

var _toolsMoreMenuGroup = _interopRequireDefault(require("../tools-more-menu-group"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var POPOVER_PROPS = {
  className: 'edit-site-more-menu__content',
  position: 'bottom left'
};
var TOGGLE_PROPS = {
  tooltipPosition: 'bottom'
};

var MoreMenu = function MoreMenu() {
  return (0, _element.createElement)(_components.DropdownMenu, {
    className: "edit-site-more-menu",
    icon: _icons.moreVertical,
    label: (0, _i18n.__)('More tools & options'),
    popoverProps: POPOVER_PROPS,
    toggleProps: TOGGLE_PROPS
  }, function (_ref) {
    var onClose = _ref.onClose;
    return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.MenuGroup, {
      label: (0, _i18n._x)('View', 'noun')
    }, (0, _element.createElement)(_featureToggle.default, {
      feature: "fixedToolbar",
      label: (0, _i18n.__)('Top toolbar'),
      info: (0, _i18n.__)('Access all block and document tools in a single place'),
      messageActivated: (0, _i18n.__)('Top toolbar activated'),
      messageDeactivated: (0, _i18n.__)('Top toolbar deactivated')
    }), (0, _element.createElement)(_featureToggle.default, {
      feature: "focusMode",
      label: (0, _i18n.__)('Spotlight mode'),
      info: (0, _i18n.__)('Focus on one block at a time'),
      messageActivated: (0, _i18n.__)('Spotlight mode activated'),
      messageDeactivated: (0, _i18n.__)('Spotlight mode deactivated')
    }), (0, _element.createElement)(_featureToggle.default, {
      feature: "fullscreenMode",
      label: (0, _i18n.__)('Fullscreen mode'),
      info: (0, _i18n.__)('Work without distraction'),
      messageActivated: (0, _i18n.__)('Fullscreen mode activated'),
      messageDeactivated: (0, _i18n.__)('Fullscreen mode deactivated')
    })), (0, _element.createElement)(_toolsMoreMenuGroup.default.Slot, {
      fillProps: {
        onClose: onClose
      }
    }));
  });
};

var _default = MoreMenu;
exports.default = _default;
//# sourceMappingURL=index.js.map