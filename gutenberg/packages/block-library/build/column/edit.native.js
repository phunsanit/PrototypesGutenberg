"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _reactNative = require("react-native");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _blockEditor = require("@wordpress/block-editor");

var _editor = _interopRequireDefault(require("./editor.scss"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ColumnEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      hasChildren = _ref.hasChildren,
      isSelected = _ref.isSelected,
      getStylesFromColorScheme = _ref.getStylesFromColorScheme,
      isParentSelected = _ref.isParentSelected,
      contentStyle = _ref.contentStyle;
  var verticalAlignment = attributes.verticalAlignment;

  var updateAlignment = function updateAlignment(alignment) {
    setAttributes({
      verticalAlignment: alignment
    });
  };

  if (!isSelected && !hasChildren) {
    return (0, _element.createElement)(_reactNative.View, {
      style: [!isParentSelected && getStylesFromColorScheme(_editor.default.columnPlaceholder, _editor.default.columnPlaceholderDark), contentStyle, _editor.default.columnPlaceholderNotSelected]
    });
  }

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.BlockVerticalAlignmentToolbar, {
    onChange: updateAlignment,
    value: verticalAlignment
  })), (0, _element.createElement)(_reactNative.View, {
    style: [contentStyle, isSelected && hasChildren && _editor.default.innerBlocksBottomSpace]
  }, (0, _element.createElement)(_blockEditor.InnerBlocks, {
    renderAppender: isSelected && _blockEditor.InnerBlocks.ButtonBlockAppender
  })));
}

function ColumnEditWrapper(props) {
  var verticalAlignment = props.attributes.verticalAlignment;

  var getVerticalAlignmentRemap = function getVerticalAlignmentRemap(alignment) {
    if (!alignment) return _editor.default.flexBase;
    return _objectSpread({}, _editor.default.flexBase, {}, _editor.default["is-vertically-aligned-".concat(alignment)]);
  };

  return (0, _element.createElement)(_reactNative.View, {
    style: getVerticalAlignmentRemap(verticalAlignment)
  }, (0, _element.createElement)(ColumnEdit, props));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref2) {
  var clientId = _ref2.clientId;

  var _select = select('core/block-editor'),
      getBlockCount = _select.getBlockCount,
      getBlockRootClientId = _select.getBlockRootClientId,
      getSelectedBlockClientId = _select.getSelectedBlockClientId;

  var selectedBlockClientId = getSelectedBlockClientId();
  var isSelected = selectedBlockClientId === clientId;
  var parentId = getBlockRootClientId(clientId);
  var hasChildren = !!getBlockCount(clientId);
  var isParentSelected = selectedBlockClientId && selectedBlockClientId === parentId;
  return {
    hasChildren: hasChildren,
    isParentSelected: isParentSelected,
    isSelected: isSelected
  };
}), _compose.withPreferredColorScheme])(ColumnEditWrapper);

exports.default = _default;
//# sourceMappingURL=edit.native.js.map