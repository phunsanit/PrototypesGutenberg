"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DownloadableBlockNotice = void 0;

var _element = require("@wordpress/element");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */
var DownloadableBlockNotice = function DownloadableBlockNotice(_ref) {
  var block = _ref.block,
      _onClick = _ref.onClick;
  var errorNotice = (0, _data.useSelect)(function (select) {
    return select('core/block-directory').getErrorNoticeForBlock(block.id);
  }, [block]);

  if (!errorNotice) {
    return null;
  }

  return (0, _element.createElement)(_components.Notice, {
    status: "error",
    isDismissible: false,
    className: "block-directory-downloadable-block-notice"
  }, (0, _element.createElement)("div", {
    className: "block-directory-downloadable-block-notice__content"
  }, errorNotice), (0, _element.createElement)(_components.Button, {
    isSmall: true,
    isPrimary: true,
    onClick: function onClick() {
      _onClick(block);
    }
  }, (0, _i18n.__)('Retry')));
};

exports.DownloadableBlockNotice = DownloadableBlockNotice;
var _default = DownloadableBlockNotice;
exports.default = _default;
//# sourceMappingURL=index.js.map