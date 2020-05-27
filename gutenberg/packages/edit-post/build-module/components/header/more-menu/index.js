import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { DropdownMenu, MenuGroup } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import ModeSwitcher from '../mode-switcher';
import PluginMoreMenuGroup from '../plugins-more-menu-group';
import ToolsMoreMenuGroup from '../tools-more-menu-group';
import OptionsMenuItem from '../options-menu-item';
import WritingMenu from '../writing-menu';
var POPOVER_PROPS = {
  className: 'edit-post-more-menu__content',
  position: 'bottom left'
};
var TOGGLE_PROPS = {
  tooltipPosition: 'bottom'
};

var MoreMenu = function MoreMenu() {
  return createElement(DropdownMenu, {
    className: "edit-post-more-menu",
    icon: moreVertical,
    label: __('More tools & options'),
    popoverProps: POPOVER_PROPS,
    toggleProps: TOGGLE_PROPS
  }, function (_ref) {
    var onClose = _ref.onClose;
    return createElement(Fragment, null, createElement(WritingMenu, null), createElement(ModeSwitcher, null), createElement(PluginMoreMenuGroup.Slot, {
      fillProps: {
        onClose: onClose
      }
    }), createElement(ToolsMoreMenuGroup.Slot, {
      fillProps: {
        onClose: onClose
      }
    }), createElement(MenuGroup, null, createElement(OptionsMenuItem, null)));
  });
};

export default MoreMenu;
//# sourceMappingURL=index.js.map