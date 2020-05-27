import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { MenuItem } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
export function ManageBlocksMenuItem(_ref) {
  var openModal = _ref.openModal;
  return createElement(MenuItem, {
    onClick: function onClick() {
      openModal('edit-post/manage-blocks');
    }
  }, __('Block Manager'));
}
export default withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      openModal = _dispatch.openModal;

  return {
    openModal: openModal
  };
})(ManageBlocksMenuItem);
//# sourceMappingURL=index.js.map