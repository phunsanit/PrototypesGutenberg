"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _downloadableBlockListItem = _interopRequireDefault(require("../downloadable-block-list-item"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function DownloadableBlocksList(_ref) {
  var items = _ref.items,
      _ref$onHover = _ref.onHover,
      onHover = _ref$onHover === void 0 ? _lodash.noop : _ref$onHover,
      onSelect = _ref.onSelect;

  var _useDispatch = (0, _data.useDispatch)('core/block-directory'),
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
    (0, _element.createElement)("ul", {
      role: "list",
      className: "block-directory-downloadable-blocks-list"
    }, items.map(function (item) {
      return (0, _element.createElement)(_downloadableBlockListItem.default, {
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

var _default = DownloadableBlocksList;
exports.default = _default;
//# sourceMappingURL=index.js.map