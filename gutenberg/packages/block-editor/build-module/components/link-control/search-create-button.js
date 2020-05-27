import _extends from "@babel/runtime/helpers/esm/extends";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { __, sprintf } from '@wordpress/i18n';
import { Button, Icon } from '@wordpress/components';
import { createInterpolateElement } from '@wordpress/element';
export var LinkControlSearchCreate = function LinkControlSearchCreate(_ref) {
  var searchTerm = _ref.searchTerm,
      onClick = _ref.onClick,
      itemProps = _ref.itemProps,
      isSelected = _ref.isSelected;

  if (!searchTerm) {
    return null;
  }

  return createElement(Button, _extends({}, itemProps, {
    className: classnames('block-editor-link-control__search-create block-editor-link-control__search-item', {
      'is-selected': isSelected
    }),
    onClick: onClick
  }), createElement(Icon, {
    className: "block-editor-link-control__search-item-icon",
    icon: "insert"
  }), createElement("span", {
    className: "block-editor-link-control__search-item-header"
  }, createElement("span", {
    className: "block-editor-link-control__search-item-title"
  }, createInterpolateElement(sprintf(
  /* translators: %s: search term. */
  __('New page: <mark>%s</mark>'), searchTerm), {
    mark: createElement("mark", null)
  }))));
};
export default LinkControlSearchCreate;
//# sourceMappingURL=search-create-button.js.map