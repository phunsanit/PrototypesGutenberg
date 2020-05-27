import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { useDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import DownloadableBlockListItem from '../downloadable-block-list-item';

function DownloadableBlocksList(_ref) {
  var items = _ref.items,
      _ref$onHover = _ref.onHover,
      onHover = _ref$onHover === void 0 ? noop : _ref$onHover,
      onSelect = _ref.onSelect;

  var _useDispatch = useDispatch('core/block-directory'),
      installBlockType = _useDispatch.installBlockType;

  if (!items.length) {
    return null;
  }

  return (
    /*
     * Disable reason: The `list` ARIA role is redundant but
     * Safari+VoiceOver won't announce the list otherwise.
     */

    /* eslint-disable jsx-a11y/no-redundant-roles */
    createElement("ul", {
      role: "list",
      className: "block-directory-downloadable-blocks-list"
    }, items.map(function (item) {
      return createElement(DownloadableBlockListItem, {
        key: item.id,
        onClick: function onClick() {
          installBlockType(item).then(function (success) {
            if (success) {
              onSelect(item);
            }
          });
          onHover(null);
        },
        item: item
      });
    }))
    /* eslint-enable jsx-a11y/no-redundant-roles */

  );
}

export default DownloadableBlocksList;
//# sourceMappingURL=index.js.map