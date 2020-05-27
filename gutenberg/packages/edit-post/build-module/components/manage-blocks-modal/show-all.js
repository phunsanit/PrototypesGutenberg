import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { FormToggle } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
export default function BlockManagerShowAll(_ref) {
  var checked = _ref.checked,
      _onChange = _ref.onChange;
  var instanceId = useInstanceId(BlockManagerShowAll);
  var id = 'edit-post-manage-blocks-modal__show-all-' + instanceId;
  return createElement("div", {
    className: "edit-post-manage-blocks-modal__show-all"
  }, createElement("label", {
    htmlFor: id,
    className: "edit-post-manage-blocks-modal__show-all-label"
  },
  /* translators: Checkbox toggle label */
  __('Show section')), createElement(FormToggle, {
    id: id,
    checked: checked,
    onChange: function onChange(event) {
      return _onChange(event.target.checked);
    }
  }));
}
//# sourceMappingURL=show-all.js.map