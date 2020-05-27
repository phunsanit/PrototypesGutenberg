"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
function GroupEdit(_ref) {
  var attributes = _ref.attributes,
      className = _ref.className,
      clientId = _ref.clientId;
  var hasInnerBlocks = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getBlock = _select.getBlock;

    var block = getBlock(clientId);
    return !!(block && block.innerBlocks.length);
  }, [clientId]);
  var BlockWrapper = _blockEditor.__experimentalBlock[attributes.tagName];
  return (0, _element.createElement)(BlockWrapper, {
    className: className
  }, (0, _element.createElement)(_blockEditor.InnerBlocks, {
    renderAppender: hasInnerBlocks ? undefined : function () {
      return (0, _element.createElement)(_blockEditor.InnerBlocks.ButtonBlockAppender, null);
    },
    __experimentalTagName: "div",
    __experimentalPassedProps: {
      className: 'wp-block-group__inner-container'
    }
  }));
}

var _default = GroupEdit;
exports.default = _default;
//# sourceMappingURL=edit.js.map