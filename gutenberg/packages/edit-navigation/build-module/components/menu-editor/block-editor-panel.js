import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { BlockList, BlockToolbar, NavigableToolbar, ObserveTyping, WritingFlow } from '@wordpress/block-editor';
import { Button, Panel, PanelBody, Popover } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import DeleteMenuButton from '../delete-menu-button';
export default function BlockEditorPanel(_ref) {
  var onDeleteMenu = _ref.onDeleteMenu,
      menuId = _ref.menuId,
      saveBlocks = _ref.saveBlocks;

  var _useSelect = useSelect(function (select) {
    var _select = select('core/block-editor'),
        isNavigationMode = _select.isNavigationMode,
        getBlockSelectionStart = _select.getBlockSelectionStart,
        getBlock = _select.getBlock;

    var selectionStartClientId = getBlockSelectionStart();
    return {
      isNavigationModeActive: isNavigationMode(),
      hasSelectedBlock: !!selectionStartClientId && !!getBlock(selectionStartClientId)
    };
  }, []),
      isNavigationModeActive = _useSelect.isNavigationModeActive,
      hasSelectedBlock = _useSelect.hasSelectedBlock;

  return createElement(Panel, {
    className: "edit-navigation-menu-editor__block-editor-panel"
  }, createElement(PanelBody, {
    title: __('Navigation menu')
  }, createElement("div", {
    className: "components-panel__header-actions"
  }, createElement(Button, {
    isPrimary: true,
    onClick: saveBlocks
  }, __('Save navigation'))), createElement(NavigableToolbar, {
    className: classnames('edit-navigation-menu-editor__block-editor-toolbar', {
      'is-hidden': isNavigationModeActive
    }),
    "aria-label": __('Block tools')
  }, hasSelectedBlock && createElement(BlockToolbar, {
    hideDragHandle: true
  })), createElement(Popover.Slot, {
    name: "block-toolbar"
  }), createElement(WritingFlow, null, createElement(ObserveTyping, null, createElement(BlockList, null))), createElement("div", {
    className: "components-panel__footer-actions"
  }, createElement(DeleteMenuButton, {
    menuId: menuId,
    onDelete: onDeleteMenu
  }))));
}
//# sourceMappingURL=block-editor-panel.js.map