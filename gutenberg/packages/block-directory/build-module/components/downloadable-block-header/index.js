import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import { BlockIcon } from '@wordpress/block-editor';
import BlockRatings from '../block-ratings';
export function DownloadableBlockHeader(_ref) {
  var icon = _ref.icon,
      title = _ref.title,
      rating = _ref.rating,
      ratingCount = _ref.ratingCount,
      isLoading = _ref.isLoading,
      _onClick = _ref.onClick;
  return createElement("div", {
    className: "block-directory-downloadable-block-header__row"
  }, icon.match(/\.(jpeg|jpg|gif|png)(?:\?.*)?$/) !== null ? createElement("img", {
    src: icon,
    alt: sprintf( // translators: %s: Name of the plugin e.g: "Akismet".
    __('%s block icon'), title)
  }) : createElement("span", null, createElement(BlockIcon, {
    icon: icon,
    showColors: true
  })), createElement("div", {
    className: "block-directory-downloadable-block-header__column"
  }, createElement("span", {
    role: "heading",
    className: "block-directory-downloadable-block-header__title"
  }, title), createElement(BlockRatings, {
    rating: rating,
    ratingCount: ratingCount
  })), createElement(Button, {
    isSecondary: true,
    isBusy: isLoading,
    disabled: isLoading,
    onClick: function onClick(event) {
      event.preventDefault();

      if (!isLoading) {
        _onClick();
      }
    }
  }, isLoading ? __('Adding…') : __('Add block')));
}
export default withSelect(function (select) {
  return {
    isLoading: select('core/block-directory').isInstalling()
  };
})(DownloadableBlockHeader);
//# sourceMappingURL=index.js.map