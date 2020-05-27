import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Button, Dropdown, MenuGroup, MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Icon, check, chevronDown } from '@wordpress/icons';
export default function PreviewOptions(_ref) {
  var children = _ref.children,
      className = _ref.className,
      _ref$isEnabled = _ref.isEnabled,
      isEnabled = _ref$isEnabled === void 0 ? true : _ref$isEnabled,
      deviceType = _ref.deviceType,
      setDeviceType = _ref.setDeviceType;
  return createElement(Dropdown, {
    className: "block-editor-post-preview__dropdown",
    contentClassName: classnames(className, 'block-editor-post-preview__dropdown-content'),
    popoverProps: {
      role: 'menu'
    },
    position: "bottom left",
    renderToggle: function renderToggle(_ref2) {
      var isOpen = _ref2.isOpen,
          onToggle = _ref2.onToggle;
      return createElement(Button, {
        onClick: onToggle,
        className: "block-editor-post-preview__button-toggle",
        "aria-expanded": isOpen,
        disabled: !isEnabled
      }, __('Preview'), createElement(Icon, {
        icon: chevronDown
      }));
    },
    renderContent: function renderContent() {
      return createElement(Fragment, null, createElement(MenuGroup, null, createElement(MenuItem, {
        className: "block-editor-post-preview__button-resize",
        onClick: function onClick() {
          return setDeviceType('Desktop');
        },
        icon: deviceType === 'Desktop' && check
      }, __('Desktop')), createElement(MenuItem, {
        className: "block-editor-post-preview__button-resize",
        onClick: function onClick() {
          return setDeviceType('Tablet');
        },
        icon: deviceType === 'Tablet' && check
      }, __('Tablet')), createElement(MenuItem, {
        className: "block-editor-post-preview__button-resize",
        onClick: function onClick() {
          return setDeviceType('Mobile');
        },
        icon: deviceType === 'Mobile' && check
      }, __('Mobile'))), children);
    }
  });
}
//# sourceMappingURL=index.js.map