"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _react = require("react");

var _reactNative = require("react-native");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _viewport = require("@wordpress/viewport");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

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
function HeaderToolbar(_ref) {
  var hasRedo = _ref.hasRedo,
      hasUndo = _ref.hasUndo,
      redo = _ref.redo,
      undo = _ref.undo,
      showInserter = _ref.showInserter,
      showKeyboardHideButton = _ref.showKeyboardHideButton,
      getStylesFromColorScheme = _ref.getStylesFromColorScheme,
      onHideKeyboard = _ref.onHideKeyboard,
      isRTL = _ref.isRTL;
  var scrollViewRef = (0, _react.useRef)(null);

  var scrollToStart = function scrollToStart() {
    scrollViewRef.current.scrollTo({
      x: 0
    });
  };

  var renderHistoryButtons = function renderHistoryButtons() {
    var buttons = [
    /* TODO: replace with EditorHistoryRedo and EditorHistoryUndo */
    (0, _element.createElement)(_components.ToolbarButton, {
      key: "undoButton",
      title: (0, _i18n.__)('Undo'),
      icon: _icons.undo,
      isDisabled: !hasUndo,
      onClick: undo,
      extraProps: {
        hint: (0, _i18n.__)('Double tap to undo last change')
      }
    }), (0, _element.createElement)(_components.ToolbarButton, {
      key: "redoButton",
      title: (0, _i18n.__)('Redo'),
      icon: _icons.redo,
      isDisabled: !hasRedo,
      onClick: redo,
      extraProps: {
        hint: (0, _i18n.__)('Double tap to redo last change')
      }
    })];
    return isRTL ? buttons.reverse() : buttons;
  };

  return (0, _element.createElement)(_reactNative.View, {
    style: getStylesFromColorScheme(_style.default.container, _style.default.containerDark)
  }, (0, _element.createElement)(_reactNative.ScrollView, {
    ref: scrollViewRef,
    onContentSizeChange: scrollToStart,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    keyboardShouldPersistTaps: "always",
    alwaysBounceHorizontal: false,
    contentContainerStyle: _style.default.scrollableContent
  }, (0, _element.createElement)(_blockEditor.Inserter, {
    disabled: !showInserter
  }), renderHistoryButtons(), (0, _element.createElement)(_blockEditor.BlockToolbar, null)), showKeyboardHideButton && (0, _element.createElement)(_components.Toolbar, {
    passedStyle: _style.default.keyboardHideContainer
  }, (0, _element.createElement)(_components.ToolbarButton, {
    title: (0, _i18n.__)('Hide keyboard'),
    icon: _icons.keyboardClose,
    onClick: onHideKeyboard,
    extraProps: {
      hint: (0, _i18n.__)('Tap to hide the keyboard')
    }
  })));
}

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  return {
    hasRedo: select('core/editor').hasEditorRedo(),
    hasUndo: select('core/editor').hasEditorUndo(),
    // This setting (richEditingEnabled) should not live in the block editor's setting.
    showInserter: select('core/edit-post').getEditorMode() === 'visual' && select('core/editor').getEditorSettings().richEditingEnabled,
    isTextModeEnabled: select('core/edit-post').getEditorMode() === 'text',
    isRTL: select('core/block-editor').getSettings().isRTL
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      clearSelectedBlock = _dispatch.clearSelectedBlock;

  var _dispatch2 = dispatch('core/editor'),
      togglePostTitleSelection = _dispatch2.togglePostTitleSelection;

  return {
    redo: dispatch('core/editor').redo,
    undo: dispatch('core/editor').undo,
    onHideKeyboard: function onHideKeyboard() {
      clearSelectedBlock();
      togglePostTitleSelection(false);
    }
  };
}), (0, _viewport.withViewportMatch)({
  isLargeViewport: 'medium'
}), _compose.withPreferredColorScheme])(HeaderToolbar);

exports.default = _default;
//# sourceMappingURL=index.native.js.map