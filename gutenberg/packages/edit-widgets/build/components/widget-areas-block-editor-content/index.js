"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WidgetAreasBlockEditorContent;

var _element = require("@wordpress/element");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _notices = _interopRequireDefault(require("../notices"));

var _keyboardShortcuts = _interopRequireDefault(require("../keyboard-shortcuts"));

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function WidgetAreasBlockEditorContent() {
  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      clearSelectedBlock = _useDispatch.clearSelectedBlock;

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_keyboardShortcuts.default, null), (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts, null), (0, _element.createElement)(_notices.default, null), (0, _element.createElement)(_components.Popover.Slot, {
    name: "block-toolbar"
  }), (0, _element.createElement)("div", {
    tabIndex: "-1",
    onFocus: clearSelectedBlock
  }, (0, _element.createElement)("div", {
    className: "editor-styles-wrapper",
    onFocus: function onFocus(event) {
      // Stop propagation of the focus event to avoid the parent
      // widget layout component catching the event and removing the selected area.
      event.stopPropagation();
      event.preventDefault();
    }
  }, (0, _element.createElement)(_blockEditor.WritingFlow, null, (0, _element.createElement)(_blockEditor.ObserveTyping, null, (0, _element.createElement)(_blockEditor.BlockList, {
    className: "edit-widgets-main-block-list"
  }))))));
}
//# sourceMappingURL=index.js.map