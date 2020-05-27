"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _editor = require("@wordpress/editor");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _blockInspectorButton = _interopRequireDefault(require("./block-inspector-button"));

var _data = require("@wordpress/data");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
function VisualEditor() {
  var deviceType = (0, _data.useSelect)(function (select) {
    return select('core/edit-post').__experimentalGetPreviewDeviceType();
  }, []);
  var inlineStyles = (0, _blockEditor.__experimentalUseResizeCanvas)(deviceType);
  return (0, _element.createElement)(_blockEditor.BlockSelectionClearer, {
    className: "edit-post-visual-editor editor-styles-wrapper",
    style: inlineStyles
  }, (0, _element.createElement)(_editor.VisualEditorGlobalKeyboardShortcuts, null), (0, _element.createElement)(_blockEditor.MultiSelectScrollIntoView, null), (0, _element.createElement)(_components.Popover.Slot, {
    name: "block-toolbar"
  }), (0, _element.createElement)(_blockEditor.Typewriter, null, (0, _element.createElement)(_blockEditor.CopyHandler, null, (0, _element.createElement)(_blockEditor.WritingFlow, null, (0, _element.createElement)(_blockEditor.ObserveTyping, null, (0, _element.createElement)("div", {
    className: "edit-post-visual-editor__post-title-wrapper"
  }, (0, _element.createElement)(_editor.PostTitle, null)), (0, _element.createElement)(_blockEditor.BlockList, null))))), (0, _element.createElement)(_blockEditor.__experimentalBlockSettingsMenuFirstItem, null, function (_ref) {
    var onClose = _ref.onClose;
    return (0, _element.createElement)(_blockInspectorButton.default, {
      onClick: onClose
    });
  }));
}

var _default = VisualEditor;
exports.default = _default;
//# sourceMappingURL=index.js.map