import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { Popover } from '@wordpress/components';
import { BlockEditorKeyboardShortcuts, WritingFlow, ObserveTyping, BlockList } from '@wordpress/block-editor';
import { useDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import Notices from '../notices';
import KeyboardShortcuts from '../keyboard-shortcuts';
export default function WidgetAreasBlockEditorContent() {
  var _useDispatch = useDispatch('core/block-editor'),
      clearSelectedBlock = _useDispatch.clearSelectedBlock;

  return createElement(Fragment, null, createElement(KeyboardShortcuts, null), createElement(BlockEditorKeyboardShortcuts, null), createElement(Notices, null), createElement(Popover.Slot, {
    name: "block-toolbar"
  }), createElement("div", {
    tabIndex: "-1",
    onFocus: clearSelectedBlock
  }, createElement("div", {
    className: "editor-styles-wrapper",
    onFocus: function onFocus(event) {
      // Stop propagation of the focus event to avoid the parent
      // widget layout component catching the event and removing the selected area.
      event.stopPropagation();
      event.preventDefault();
    }
  }, createElement(WritingFlow, null, createElement(ObserveTyping, null, createElement(BlockList, {
    className: "edit-widgets-main-block-list"
  }))))));
}
//# sourceMappingURL=index.js.map