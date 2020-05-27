import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { InnerBlocks, __experimentalBlock as Block } from '@wordpress/block-editor';

function GroupEdit(_ref) {
  var attributes = _ref.attributes,
      className = _ref.className,
      clientId = _ref.clientId;
  var hasInnerBlocks = useSelect(function (select) {
    var _select = select('core/block-editor'),
        getBlock = _select.getBlock;

    var block = getBlock(clientId);
    return !!(block && block.innerBlocks.length);
  }, [clientId]);
  var BlockWrapper = Block[attributes.tagName];
  return createElement(BlockWrapper, {
    className: className
  }, createElement(InnerBlocks, {
    renderAppender: hasInnerBlocks ? undefined : function () {
      return createElement(InnerBlocks.ButtonBlockAppender, null);
    },
    __experimentalTagName: "div",
    __experimentalPassedProps: {
      className: 'wp-block-group__inner-container'
    }
  }));
}

export default GroupEdit;
//# sourceMappingURL=edit.js.map