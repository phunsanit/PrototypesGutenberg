import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { VisuallyHidden } from '@wordpress/components';
import { Icon, search } from '@wordpress/icons';

function InserterSearchForm(_ref) {
  var _onChange = _ref.onChange;
  var instanceId = useInstanceId(InserterSearchForm); // Disable reason (no-autofocus): The inserter menu is a modal display, not one which
  // is always visible, and one which already incurs this behavior of autoFocus via
  // Popover's focusOnMount.

  /* eslint-disable jsx-a11y/no-autofocus */

  return createElement("div", {
    className: "block-editor-inserter__search"
  }, createElement(VisuallyHidden, {
    as: "label",
    htmlFor: "block-editor-inserter__search-".concat(instanceId)
  }, __('Search for a block')), createElement("input", {
    className: "block-editor-inserter__search-input",
    id: "block-editor-inserter__search-".concat(instanceId),
    type: "search",
    placeholder: __('Search for a block'),
    autoFocus: true,
    onChange: function onChange(event) {
      return _onChange(event.target.value);
    },
    autoComplete: "off"
  }), createElement(Icon, {
    className: "block-editor-inserter__search-icon",
    icon: search
  }));
  /* eslint-enable jsx-a11y/no-autofocus */
}

export default InserterSearchForm;
//# sourceMappingURL=search-form.js.map