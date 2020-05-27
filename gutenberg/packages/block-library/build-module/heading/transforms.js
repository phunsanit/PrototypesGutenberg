import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";

/**
 * WordPress dependencies
 */
import { createBlock, getBlockAttributes } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import { getLevelFromHeadingNodeName } from './shared';
var _name$category$attrib = {
  name: "core/heading",
  category: "common",
  attributes: {
    align: {
      type: "string"
    },
    content: {
      type: "string",
      source: "html",
      selector: "h1,h2,h3,h4,h5,h6",
      "default": ""
    },
    level: {
      type: "number",
      "default": 2
    },
    placeholder: {
      type: "string"
    }
  },
  supports: {
    className: false,
    anchor: true,
    __unstablePasteTextInline: true,
    lightBlockWrapper: true,
    __experimentalColor: true,
    __experimentalLineHeight: true,
    __experimentalFontSize: true
  }
},
    name = _name$category$attrib.name;
var transforms = {
  from: [{
    type: 'block',
    blocks: ['core/paragraph'],
    transform: function transform(_ref) {
      var content = _ref.content;
      return createBlock(name, {
        content: content
      });
    }
  }, {
    type: 'raw',
    selector: 'h1,h2,h3,h4,h5,h6',
    schema: function schema(_ref2) {
      var phrasingContentSchema = _ref2.phrasingContentSchema,
          isPaste = _ref2.isPaste;
      var schema = {
        children: phrasingContentSchema,
        attributes: isPaste ? [] : ['style']
      };
      return {
        h1: schema,
        h2: schema,
        h3: schema,
        h4: schema,
        h5: schema,
        h6: schema
      };
    },
    transform: function transform(node) {
      var attributes = getBlockAttributes(name, node.outerHTML);

      var _ref3 = node.style || {},
          textAlign = _ref3.textAlign;

      attributes.level = getLevelFromHeadingNodeName(node.nodeName);

      if (textAlign === 'left' || textAlign === 'center' || textAlign === 'right') {
        attributes.align = textAlign;
      }

      return createBlock(name, attributes);
    }
  }].concat(_toConsumableArray([2, 3, 4, 5, 6].map(function (level) {
    return {
      type: 'prefix',
      prefix: Array(level + 1).join('#'),
      transform: function transform(content) {
        return createBlock(name, {
          level: level,
          content: content
        });
      }
    };
  }))),
  to: [{
    type: 'block',
    blocks: ['core/paragraph'],
    transform: function transform(_ref4) {
      var content = _ref4.content;
      return createBlock('core/paragraph', {
        content: content
      });
    }
  }]
};
export default transforms;
//# sourceMappingURL=transforms.js.map