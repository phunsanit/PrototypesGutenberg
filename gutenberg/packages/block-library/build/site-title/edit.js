"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SiteTitleEdit;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _coreData = require("@wordpress/core-data");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
function SiteTitleEdit() {
  var _useEntityProp = (0, _coreData.useEntityProp)('root', 'site', 'title'),
      _useEntityProp2 = (0, _slicedToArray2.default)(_useEntityProp, 2),
      title = _useEntityProp2[0],
      setTitle = _useEntityProp2[1];

  return (0, _element.createElement)(_blockEditor.PlainText, {
    __experimentalVersion: 2,
    tagName: _blockEditor.__experimentalBlock.h1,
    placeholder: (0, _i18n.__)('Site Title'),
    value: title,
    onChange: setTitle,
    disableLineBreaks: true
  });
}
//# sourceMappingURL=edit.js.map