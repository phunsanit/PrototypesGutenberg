import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { __, _n, sprintf } from '@wordpress/i18n';

function DownloadableBlockAuthorInfo(_ref) {
  var author = _ref.author,
      authorBlockCount = _ref.authorBlockCount,
      authorBlockRating = _ref.authorBlockRating;
  return createElement(Fragment, null, createElement("span", {
    className: "block-directory-downloadable-block-author-info__content-author"
  }, sprintf(
  /* translators: %s: author name. */
  __('Authored by %s'), author)), createElement("span", {
    className: "block-directory-downloadable-block-author-info__content"
  }, authorBlockRating > 0 ? sprintf(
  /* translators: 1: number of blocks. 2: average rating. */
  _n('This author has %1$d block, with an average rating of %2$d.', 'This author has %1$d blocks, with an average rating of %2$d.', authorBlockCount), authorBlockCount, authorBlockRating) : sprintf(
  /* translators: 1: number of blocks. */
  _n('This author has %1$d block.', 'This author has %1$d blocks.', authorBlockCount), authorBlockCount)));
}

export default DownloadableBlockAuthorInfo;
//# sourceMappingURL=index.js.map