import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { DropdownMenu, MenuGroup } from '@wordpress/components';
import { moreVertical } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import FeatureToggle from '../feature-toggle';
import ToolsMoreMenuGroup from '../tools-more-menu-group';
var POPOVER_PROPS = {
  className: 'edit-site-more-menu__content',
  position: 'bottom left'
};
var TOGGLE_PROPS = {
  tooltipPosition: 'bottom'
};

var MoreMenu = function MoreMenu() {
  return createElement(DropdownMenu, {
    className: "edit-site-more-menu",
    icon: moreVertical,
    label: __('More tools & options'),
    popoverProps: POPOVER_PROPS,
    toggleProps: TOGGLE_PROPS
  }, function (_ref) {
    var onClose = _ref.onClose;
    return createElement(Fragment, null, createElement(MenuGroup, {
      label: _x('View', 'noun')
    }, createElement(FeatureToggle, {
      feature: "fixedToolbar",
      label: __('Top toolbar'),
      info: __('Access all block and document tools in a single place'),
      messageActivated: __('Top toolbar activated'),
      messageDeactivated: __('Top toolbar deactivated')
    }), createElement(FeatureToggle, {
      feature: "focusMode",
      label: __('Spotlight mode'),
      info: __('Focus on one block at a time'),
      messageActivated: __('Spotlight mode activated'),
      messageDeactivated: __('Spotlight mode deactivated')
    }), createElement(FeatureToggle, {
      feature: "fullscreenMode",
      label: __('Fullscreen mode'),
      info: __('Work without distraction'),
      messageActivated: __('Fullscreen mode activated'),
      messageDeactivated: __('Fullscreen mode deactivated')
    })), createElement(ToolsMoreMenuGroup.Slot, {
      fillProps: {
        onClose: onClose
      }
    }));
  });
};

export default MoreMenu;
//# sourceMappingURL=index.js.map