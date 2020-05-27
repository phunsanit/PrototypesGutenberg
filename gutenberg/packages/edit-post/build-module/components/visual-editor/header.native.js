import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import React from 'react';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { PostTitle } from '@wordpress/editor';
import { ReadableContentView } from '@wordpress/components';
/**
 * Internal dependencies
 */

import styles from './style.scss';
var Header = React.memo(function EditorHeader(_ref) {
  var editTitle = _ref.editTitle,
      setTitleRef = _ref.setTitleRef,
      title = _ref.title,
      getStylesFromColorScheme = _ref.getStylesFromColorScheme;
  var blockHolderFocusedStyle = getStylesFromColorScheme(styles.blockHolderFocused, styles.blockHolderFocusedDark);
  return createElement(ReadableContentView, null, createElement(PostTitle, {
    innerRef: setTitleRef,
    title: title,
    onUpdate: editTitle,
    placeholder: __('Add title'),
    borderStyle: styles.blockHolderFullBordered,
    focusedBorderColor: blockHolderFocusedStyle.borderColor,
    accessibilityLabel: "post-title"
  }));
}, function (prevProps, nextProps) {
  return prevProps.title === nextProps.title;
});
export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  return {
    title: getEditedPostAttribute('title')
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/editor'),
      editPost = _dispatch.editPost;

  var _dispatch2 = dispatch('core/block-editor'),
      clearSelectedBlock = _dispatch2.clearSelectedBlock;

  return {
    clearSelectedBlock: clearSelectedBlock,
    editTitle: function editTitle(title) {
      editPost({
        title: title
      });
    }
  };
}), withPreferredColorScheme])(Header);
//# sourceMappingURL=header.native.js.map