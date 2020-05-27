import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { PostTitle, VisualEditorGlobalKeyboardShortcuts } from '@wordpress/editor';
import { WritingFlow, Typewriter, ObserveTyping, BlockList, CopyHandler, BlockSelectionClearer, MultiSelectScrollIntoView, __experimentalBlockSettingsMenuFirstItem, __experimentalUseResizeCanvas as useResizeCanvas } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';
/**
 * Internal dependencies
 */

import BlockInspectorButton from './block-inspector-button';
import { useSelect } from '@wordpress/data';

function VisualEditor() {
  var deviceType = useSelect(function (select) {
    return select('core/edit-post').__experimentalGetPreviewDeviceType();
  }, []);
  var inlineStyles = useResizeCanvas(deviceType);
  return createElement(BlockSelectionClearer, {
    className: "edit-post-visual-editor editor-styles-wrapper",
    style: inlineStyles
  }, createElement(VisualEditorGlobalKeyboardShortcuts, null), createElement(MultiSelectScrollIntoView, null), createElement(Popover.Slot, {
    name: "block-toolbar"
  }), createElement(Typewriter, null, createElement(CopyHandler, null, createElement(WritingFlow, null, createElement(ObserveTyping, null, createElement("div", {
    className: "edit-post-visual-editor__post-title-wrapper"
  }, createElement(PostTitle, null)), createElement(BlockList, null))))), createElement(__experimentalBlockSettingsMenuFirstItem, null, function (_ref) {
    var onClose = _ref.onClose;
    return createElement(BlockInspectorButton, {
      onClick: onClose
    });
  }));
}

export default VisualEditor;
//# sourceMappingURL=index.js.map