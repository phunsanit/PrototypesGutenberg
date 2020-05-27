"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function DownloadableBlockAuthorInfo(_ref) {
  var author = _ref.author,
      authorBlockCount = _ref.authorBlockCount,
      authorBlockRating = _ref.authorBlockRating;
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)("span", {
    className: "block-directory-downloadable-block-author-info__content-author"
  }, (0, _i18n.sprintf)(
  /* translators: %s: author name. */
  (0, _i18n.__)('Authored by %s'), author)), (0, _element.createElement)("span", {
    className: "block-directory-downloadable-block-author-info__content"
  }, authorBlockRating > 0 ? (0, _i18n.sprintf)(
  /* translators: 1: number of blocks. 2: average rating. */
  (0, _i18n._n)('This author has %1$d block, with an average rating of %2$d.', 'This author has %1$d blocks, with an average rating of %2$d.', authorBlockCount), authorBlockCount, authorBlockRating) : (0, _i18n.sprintf)(
  /* translators: 1: number of blocks. */
  (0, _i18n._n)('This author has %1$d block.', 'This author has %1$d blocks.', authorBlockCount), authorBlockCount)));
}

var _default = DownloadableBlockAuthorInfo;
exports.default = _default;
//# sourceMappingURL=index.js.map