"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _blocks = require("@wordpress/blocks");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var _name$category$attrib = {
  name: "core/paragraph",
  category: "common",
  attributes: {
    align: {
      type: "string"
    },
    content: {
      type: "string",
      source: "html",
      selector: "p",
      "default": ""
    },
    dropCap: {
      type: "boolean",
      "default": false
    },
    placeholder: {
      type: "string"
    },
    direction: {
      type: "string",
      "enum": ["ltr", "rtl"]
    }
  },
  supports: {
    className: false,
    __unstablePasteTextInline: true,
    lightBlockWrapper: true,
    __experimentalColor: true,
    __experimentalLineHeight: true,
    __experimentalFontSize: true,
    __experimentalFeatures: {
      typography: {
        dropCap: true
      }
    }
  }
},
    name = _name$category$attrib.name;
var transforms = {
  from: [{
    type: 'raw',
    // Paragraph is a fallback and should be matched last.
    priority: 20,
    selector: 'p',
    schema: function schema(_ref) {
      var phrasingContentSchema = _ref.phrasingContentSchema,
          isPaste = _ref.isPaste;
      return {
        p: {
          children: phrasingContentSchema,
          attributes: isPaste ? [] : ['style']
        }
      };
    },
    transform: function transform(node) {
      var attributes = (0, _blocks.getBlockAttributes)(name, node.outerHTML);

      var _ref2 = node.style || {},
          textAlign = _ref2.textAlign;

      if (textAlign === 'left' || textAlign === 'center' || textAlign === 'right') {
        attributes.align = textAlign;
      }

      return (0, _blocks.createBlock)(name, attributes);
    }
  }]
};
var _default = transforms;
exports.default = _default;
//# sourceMappingURL=transforms.js.map