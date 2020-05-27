"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

var _style = _interopRequireDefault(require("./style.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var Header = _react.default.memo(function EditorHeader(_ref) {
  var editTitle = _ref.editTitle,
      setTitleRef = _ref.setTitleRef,
      title = _ref.title,
      getStylesFromColorScheme = _ref.getStylesFromColorScheme;
  var blockHolderFocusedStyle = getStylesFromColorScheme(_style.default.blockHolderFocused, _style.default.blockHolderFocusedDark);
  return (0, _element.createElement)(_components.ReadableContentView, null, (0, _element.createElement)(_editor.PostTitle, {
    innerRef: setTitleRef,
    title: title,
    onUpdate: editTitle,
    placeholder: (0, _i18n.__)('Add title'),
    borderStyle: _style.default.blockHolderFullBordered,
    focusedBorderColor: blockHolderFocusedStyle.borderColor,
    accessibilityLabel: "post-title"
  }));
}, function (prevProps, nextProps) {
  return prevProps.title === nextProps.title;
});

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      getEditedPostAttribute = _select.getEditedPostAttribute;

  return {
    title: getEditedPostAttribute('title')
  };
}), (0, _data.withDispatch)(function (dispatch) {
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
}), _compose.withPreferredColorScheme])(Header);

exports.default = _default;
//# sourceMappingURL=header.native.js.map