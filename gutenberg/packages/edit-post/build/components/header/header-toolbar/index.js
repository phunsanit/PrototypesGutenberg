"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

/**
 * WordPress dependencies
 */
function HeaderToolbar(_ref) {
  var onToggleInserter = _ref.onToggleInserter,
      isInserterOpen = _ref.isInserterOpen;

  var _useSelect = (0, _data.useSelect)(function (select) {
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

  var isLargeViewport = (0, _compose.useViewportMatch)('medium');
  var displayBlockToolbar = !isLargeViewport || previewDeviceType !== 'Desktop' || hasFixedToolbar;
  var toolbarAriaLabel = displayBlockToolbar ?
  /* translators: accessibility text for the editor toolbar when Top Toolbar is on */
  (0, _i18n.__)('Document and block tools') :
  /* translators: accessibility text for the editor toolbar when Top Toolbar is off */
  (0, _i18n.__)('Document tools');
  return (0, _element.createElement)(_blockEditor.NavigableToolbar, {
    className: "edit-post-header-toolbar",
    "aria-label": toolbarAriaLabel
  }, (0, _element.createElement)(_components.Button, {
    className: "edit-post-header-toolbar__inserter-toggle",
    isPrimary: true,
    isPressed: isInserterOpen,
    onClick: onToggleInserter,
    disabled: !isInserterEnabled,
    icon: _icons.plus,
    label: (0, _i18n._x)('Add block', 'Generic label for block inserter button')
  }), (0, _element.createElement)(_blockEditor.ToolSelector, null), (0, _element.createElement)(_editor.EditorHistoryUndo, null), (0, _element.createElement)(_editor.EditorHistoryRedo, null), (0, _element.createElement)(_editor.TableOfContents, {
    hasOutlineItemsDisabled: isTextModeEnabled
  }), (0, _element.createElement)(_blockEditor.BlockNavigationDropdown, {
    isDisabled: isTextModeEnabled
  }), displayBlockToolbar && (0, _element.createElement)("div", {
    className: "edit-post-header-toolbar__block-toolbar"
  }, (0, _element.createElement)(_blockEditor.BlockToolbar, {
    hideDragHandle: true
  })));
}

var _default = HeaderToolbar;
exports.default = _default;
//# sourceMappingURL=index.js.map