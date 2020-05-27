import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { withSelect } from '@wordpress/data';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import styles from './editor.scss';

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
    return createElement(View, {
      style: [!isParentSelected && getStylesFromColorScheme(styles.columnPlaceholder, styles.columnPlaceholderDark), contentStyle, styles.columnPlaceholderNotSelected]
    });
  }

  return createElement(Fragment, null, createElement(BlockControls, null, createElement(BlockVerticalAlignmentToolbar, {
    onChange: updateAlignment,
    value: verticalAlignment
  })), createElement(View, {
    style: [contentStyle, isSelected && hasChildren && styles.innerBlocksBottomSpace]
  }, createElement(InnerBlocks, {
    renderAppender: isSelected && InnerBlocks.ButtonBlockAppender
  })));
}

function ColumnEditWrapper(props) {
  var verticalAlignment = props.attributes.verticalAlignment;

  var getVerticalAlignmentRemap = function getVerticalAlignmentRemap(alignment) {
    if (!alignment) return styles.flexBase;
    return _objectSpread({}, styles.flexBase, {}, styles["is-vertically-aligned-".concat(alignment)]);
  };

  return createElement(View, {
    style: getVerticalAlignmentRemap(verticalAlignment)
  }, createElement(ColumnEdit, props));
}

export default compose([withSelect(function (select, _ref2) {
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
}), withPreferredColorScheme])(ColumnEditWrapper);
//# sourceMappingURL=edit.native.js.map