"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PreviewOptions;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function PreviewOptions(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$isEnabled = _ref.isEnabled,
      isEnabled = _ref$isEnabled === void 0 ? true : _ref$isEnabled,
      deviceType = _ref.deviceType,
      setDeviceType = _ref.setDeviceType;
  return (0, _element.createElement)(_components.Dropdown, {
    className: "block-editor-post-preview__dropdown",
    contentClassName: (0, _classnames.default)(className, 'block-editor-post-preview__dropdown-content'),
    popoverProps: {
      role: 'menu'
    },
    position: "bottom left",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;
      return (0, _element.createElement)(_components.Button, {
        onClick: onToggle,
        className: "block-editor-post-preview__button-toggle",
        "aria-expanded": isOpen,
        disabled: !isEnabled
      }, (0, _i18n.__)('Preview'), (0, _element.createElement)(_icons.Icon, {
        icon: _icons.chevronDown
      }));
    },
    renderContent: function renderContent() {
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.MenuGroup, null, (0, _element.createElement)(_components.MenuItem, {
        className: "block-editor-post-preview__button-resize",
        onClick: function onClick() {
          return setDeviceType('Desktop');
        },
        icon: deviceType === 'Desktop' && _icons.check
      }, (0, _i18n.__)('Desktop')), (0, _element.createElement)(_components.MenuItem, {
        className: "block-editor-post-preview__button-resize",
        onClick: function onClick() {
          return setDeviceType('Tablet');
        },
        icon: deviceType === 'Tablet' && _icons.check
      }, (0, _i18n.__)('Tablet')), (0, _element.createElement)(_components.MenuItem, {
        className: "block-editor-post-preview__button-resize",
        onClick: function onClick() {
          return setDeviceType('Mobile');
        },
        icon: deviceType === 'Mobile' && _icons.check
      }, (0, _i18n.__)('Mobile'))), children);
    }
  });
}
//# sourceMappingURL=index.js.map