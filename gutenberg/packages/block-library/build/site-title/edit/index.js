"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SiteTitleEdit;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _coreData = require("@wordpress/core-data");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _levelToolbar = _interopRequireDefault(require("./level-toolbar"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function SiteTitleEdit(_ref) {
  var level = _ref.attributes.level,
      setAttributes = _ref.setAttributes;

  var _useEntityProp = (0, _coreData.useEntityProp)('root', 'site', 'title'),
      _useEntityProp2 = (0, _slicedToArray2.default)(_useEntityProp, 2),
      title = _useEntityProp2[0],
      setTitle = _useEntityProp2[1];

  var tagName = level === 0 ? 'p' : "h".concat(level);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_levelToolbar.default, {
    level: level,
    onChange: function onChange(newLevel) {
      return setAttributes({
        level: newLevel
      });
    }
  })), (0, _element.createElement)(_blockEditor.RichText, {
    tagName: tagName,
    placeholder: (0, _i18n.__)('Site Title'),
    value: title,
    onChange: setTitle,
    allowedFormats: []
  }));
}
//# sourceMappingURL=index.js.map