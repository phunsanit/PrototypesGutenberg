"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DownloadableBlockHeader = DownloadableBlockHeader;
exports.default = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _blockRatings = _interopRequireDefault(require("../block-ratings"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function DownloadableBlockHeader(_ref) {
  var icon = _ref.icon,
      title = _ref.title,
      rating = _ref.rating,
      ratingCount = _ref.ratingCount,
      isLoading = _ref.isLoading,
      _onClick = _ref.onClick;
  return (0, _element.createElement)("div", {
    className: "block-directory-downloadable-block-header__row"
  }, icon.match(/\.(jpeg|jpg|gif|png)(?:\?.*)?$/) !== null ? (0, _element.createElement)("img", {
    src: icon,
    alt: (0, _i18n.sprintf)( // translators: %s: Name of the plugin e.g: "Akismet".
    (0, _i18n.__)('%s block icon'), title)
  }) : (0, _element.createElement)("span", null, (0, _element.createElement)(_blockEditor.BlockIcon, {
    icon: icon,
    showColors: true
  })), (0, _element.createElement)("div", {
    className: "block-directory-downloadable-block-header__column"
  }, (0, _element.createElement)("span", {
    role: "heading",
    className: "block-directory-downloadable-block-header__title"
  }, title), (0, _element.createElement)(_blockRatings.default, {
    rating: rating,
    ratingCount: ratingCount
  })), (0, _element.createElement)(_components.Button, {
    isSecondary: true,
    isBusy: isLoading,
    disabled: isLoading,
    onClick: function onClick(event) {
      event.preventDefault();

      if (!isLoading) {
        _onClick();
      }
    }
  }, isLoading ? (0, _i18n.__)('Adding…') : (0, _i18n.__)('Add block')));
}

var _default = (0, _data.withSelect)(function (select) {
  return {
    isLoading: select('core/block-directory').isInstalling()
  };
})(DownloadableBlockHeader);

exports.default = _default;
//# sourceMappingURL=index.js.map