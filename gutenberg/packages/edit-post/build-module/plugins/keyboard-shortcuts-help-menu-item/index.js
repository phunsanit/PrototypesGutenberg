import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { displayShortcut } from '@wordpress/keycodes';
export function KeyboardShortcutsHelpMenuItem(_ref) {
  var openModal = _ref.openModal;
  return createElement(MenuItem, {
    onClick: function onClick() {
      openModal('edit-post/keyboard-shortcut-help');
    },
    shortcut: displayShortcut.access('h')
  }, __('Keyboard shortcuts'));
}
export default withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal;

  return {
    openModal: openModal
  };
})(KeyboardShortcutsHelpMenuItem);
//# sourceMappingURL=index.js.map