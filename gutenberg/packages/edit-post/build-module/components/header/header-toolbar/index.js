import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useViewportMatch } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import { BlockToolbar, NavigableToolbar, BlockNavigationDropdown, ToolSelector } from '@wordpress/block-editor';
import { TableOfContents, EditorHistoryRedo, EditorHistoryUndo } from '@wordpress/editor';
import { Button } from '@wordpress/components';
import { plus } from '@wordpress/icons';

function HeaderToolbar(_ref) {
  var onToggleInserter = _ref.onToggleInserter,
      isInserterOpen = _ref.isInserterOpen;

  var _useSelect = useSelect(function (select) {
    var _select = select('core/block-editor'),
        hasInserterItems = _select.hasInserterItems,
        getBlockRootClientId = _select.getBlockRootClientId,
        getBlockSelectionEnd = _select.getBlockSelectionEnd;

    return {
      hasFixedToolbar: select('core/edit-post').isFeatureActive('fixedToolbar'),
      // This setting (richEditingEnabled) should not live in the block editor's setting.
      isInserterEnabled: select('core/edit-post').getEditorMode() === 'visual' && select('core/editor').getEditorSettings().richEditingEnabled && hasInserterItems(getBlockRootClientId(getBlockSelectionEnd())),
      isTextModeEnabled: select('core/edit-post').getEditorMode() === 'text',
      previewDeviceType: select('core/edit-post').__experimentalGetPreviewDeviceType()
    };
  }, []),
      hasFixedToolbar = _useSelect.hasFixedToolbar,
      isInserterEnabled = _useSelect.isInserterEnabled,
      isTextModeEnabled = _useSelect.isTextModeEnabled,
      previewDeviceType = _useSelect.previewDeviceType;

  var isLargeViewport = useViewportMatch('medium');
  var displayBlockToolbar = !isLargeViewport || previewDeviceType !== 'Desktop' || hasFixedToolbar;
  var toolbarAriaLabel = displayBlockToolbar ?
  /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
  __('Document and block tools') :
  /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
  __('Document tools');
  return createElement(NavigableToolbar, {
    className: "edit-post-header-toolbar",
    "aria-label": toolbarAriaLabel
  }, createElement(Button, {
    className: "edit-post-header-toolbar__inserter-toggle",
    isPrimary: true,
    isPressed: isInserterOpen,
    onClick: onToggleInserter,
    disabled: !isInserterEnabled,
    icon: plus,
    label: _x('Add block', 'Generic label for block inserter button')
  }), createElement(ToolSelector, null), createElement(EditorHistoryUndo, null), createElement(EditorHistoryRedo, null), createElement(TableOfContents, {
    hasOutlineItemsDisabled: isTextModeEnabled
  }), createElement(BlockNavigationDropdown, {
    isDisabled: isTextModeEnabled
  }), displayBlockToolbar && createElement("div", {
    className: "edit-post-header-toolbar__block-toolbar"
  }, createElement(BlockToolbar, {
    hideDragHandle: true
  })));
}

export default HeaderToolbar;
//# sourceMappingURL=index.js.map