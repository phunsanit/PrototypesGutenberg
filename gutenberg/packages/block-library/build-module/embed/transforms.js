import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { renderToString } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
/**
 * Default transforms for generic embeds.
 */

var transforms = {
  from: [{
    type: 'raw',
    isMatch: function isMatch(node) {
      return node.nodeName === 'P' && /^\s*(https?:\/\/\S+)\s*$/i.test(node.textContent);
    },
    transform: function transform(node) {
      return createBlock('core/embed', {
        url: node.textContent.trim()
      });
    }
  }],
  to: [{
    type: 'block',
    blocks: ['core/paragraph'],
    transform: function transform(_ref) {
      var url = _ref.url,
          caption = _ref.caption;
      var link = createElement("a", {
        href: url
      }, caption || url);
      return createBlock('core/paragraph', {
        content: renderToString(link)
      });
    }
  }]
};
export default transforms;
//# sourceMappingURL=transforms.js.map