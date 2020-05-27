import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { NavigableMenu } from '@wordpress/components';
import { BlockNavigationDropdown, BlockToolbar, Inserter } from '@wordpress/block-editor';
import { PinnedItems } from '@wordpress/interface';
import { useViewportMatch } from '@wordpress/compose';
/**
 * Internal dependencies
 */

import SaveButton from '../save-button';
import UndoButton from './undo-redo/undo';
import RedoButton from './undo-redo/redo';
var inserterToggleProps = {
  isPrimary: true
};

function Header(_ref) {
  var isCustomizer = _ref.isCustomizer;
  var isLargeViewport = useViewportMatch('medium');
  return createElement(Fragment, null, createElement("div", {
    className: "edit-widgets-header"
  }, createElement(NavigableMenu, null, createElement(Inserter, {
    position: "bottom right",
    showInserterHelpPanel: true,
    toggleProps: inserterToggleProps
  }), createElement(UndoButton, null), createElement(RedoButton, null), createElement(BlockNavigationDropdown, null)), !isCustomizer && createElement("h1", {
    className: "edit-widgets-header__title"
  }, __('Block Areas'), " ", __('(experimental)')), createElement("div", {
    className: "edit-widgets-header__actions"
  }, !isCustomizer && createElement(SaveButton, null), createElement(PinnedItems.Slot, {
    scope: "core/edit-widgets"
  }))), (!isLargeViewport || isCustomizer) && createElement("div", {
    className: "edit-widgets-header__block-toolbar"
  }, createElement(BlockToolbar, {
    hideDragHandle: true
  })));
}

export default Header;
//# sourceMappingURL=index.js.map