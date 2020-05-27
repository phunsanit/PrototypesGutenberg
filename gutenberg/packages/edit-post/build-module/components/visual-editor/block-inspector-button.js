import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { MenuItem, withSpokenMessages } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
export function BlockInspectorButton(_ref) {
  var _ref$onClick = _ref.onClick,
      _onClick = _ref$onClick === void 0 ? noop : _ref$onClick,
      _ref$small = _ref.small,
      small = _ref$small === void 0 ? false : _ref$small,
      speak = _ref.speak;

  var _useSelect = useSelect(function (select) {
    return {
      shortcut: select('core/keyboard-shortcuts').getShortcutRepresentation('core/edit-post/toggle-sidebar'),
      areAdvancedSettingsOpened: select('core/edit-post').getActiveGeneralSidebarName() === 'edit-post/block'
    };
  }, []),
      shortcut = _useSelect.shortcut,
      areAdvancedSettingsOpened = _useSelect.areAdvancedSettingsOpened;

  var _useDispatch = useDispatch('core/edit-post'),
      openGeneralSidebar = _useDispatch.openGeneralSidebar,
      closeGeneralSidebar = _useDispatch.closeGeneralSidebar;

  var speakMessage = function speakMessage() {
    if (areAdvancedSettingsOpened) {
      speak(__('Block settings closed'));
    } else {
      speak(__('Additional settings are now available in the Editor block settings sidebar'));
    }
  };

  var label = areAdvancedSettingsOpened ? __('Hide Block Settings') : __('Show Block Settings');
  return createElement(MenuItem, {
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
export default withSpokenMessages(BlockInspectorButton);
//# sourceMappingURL=block-inspector-button.js.map