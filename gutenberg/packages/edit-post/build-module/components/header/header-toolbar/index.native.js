import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { useRef } from 'react';
import { ScrollView, View } from 'react-native';
/**
 * WordPress dependencies
 */

import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { withViewportMatch } from '@wordpress/viewport';
import { __ } from '@wordpress/i18n';
import { Inserter, BlockToolbar } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton } from '@wordpress/components';
import { keyboardClose, undo as undoIcon, redo as redoIcon } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import styles from './style.scss';

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
  var scrollViewRef = useRef(null);

  var scrollToStart = function scrollToStart() {
    scrollViewRef.current.scrollTo({
      x: 0
    });
  };

  var renderHistoryButtons = function renderHistoryButtons() {
    var buttons = [
    /* TODO: replace with EditorHistoryRedo and EditorHistoryUndo */
    createElement(ToolbarButton, {
      key: "undoButton",
      title: __('Undo'),
      icon: undoIcon,
      isDisabled: !hasUndo,
      onClick: undo,
      extraProps: {
        hint: __('Double tap to undo last change')
      }
    }), createElement(ToolbarButton, {
      key: "redoButton",
      title: __('Redo'),
      icon: redoIcon,
      isDisabled: !hasRedo,
      onClick: redo,
      extraProps: {
        hint: __('Double tap to redo last change')
      }
    })];
    return isRTL ? buttons.reverse() : buttons;
  };

  return createElement(View, {
    style: getStylesFromColorScheme(styles.container, styles.containerDark)
  }, createElement(ScrollView, {
    ref: scrollViewRef,
    onContentSizeChange: scrollToStart,
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    keyboardShouldPersistTaps: "always",
    alwaysBounceHorizontal: false,
    contentContainerStyle: styles.scrollableContent
  }, createElement(Inserter, {
    disabled: !showInserter
  }), renderHistoryButtons(), createElement(BlockToolbar, null)), showKeyboardHideButton && createElement(Toolbar, {
    passedStyle: styles.keyboardHideContainer
  }, createElement(ToolbarButton, {
    title: __('Hide keyboard'),
    icon: keyboardClose,
    onClick: onHideKeyboard,
    extraProps: {
      hint: __('Tap to hide the keyboard')
    }
  })));
}

export default compose([withSelect(function (select) {
  return {
    hasRedo: select('core/editor').hasEditorRedo(),
    hasUndo: select('core/editor').hasEditorUndo(),
    // This setting (richEditingEnabled) should not live in the block editor's setting.
    showInserter: select('core/edit-post').getEditorMode() === 'visual' && select('core/editor').getEditorSettings().richEditingEnabled,
    isTextModeEnabled: select('core/edit-post').getEditorMode() === 'text',
    isRTL: select('core/block-editor').getSettings().isRTL
  };
}), withDispatch(function (dispatch) {
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
}), withViewportMatch({
  isLargeViewport: 'medium'
}), withPreferredColorScheme])(HeaderToolbar);
//# sourceMappingURL=index.native.js.map