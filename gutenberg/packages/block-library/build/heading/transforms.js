"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _blocks = require("@wordpress/blocks");

var _shared = require("./shared");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
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
      return (0, _blocks.createBlock)(name, {
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
      var attributes = (0, _blocks.getBlockAttributes)(name, node.outerHTML);

      var _ref3 = node.style || {},
          textAlign = _ref3.textAlign;

      attributes.level = (0, _shared.getLevelFromHeadingNodeName)(node.nodeName);

      if (textAlign === 'left' || textAlign === 'center' || textAlign === 'right') {
        attributes.align = textAlign;
      }

      return (0, _blocks.createBlock)(name, attributes);
    }
  }].concat((0, _toConsumableArray2.default)([2, 3, 4, 5, 6].map(function (level) {
    return {
      type: 'prefix',
      prefix: Array(level + 1).join('#'),
      transform: function transform(content) {
        return (0, _blocks.createBlock)(name, {
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
      return (0, _blocks.createBlock)('core/paragraph', {
        content: content
      });
    }
  }]
};
var _default = transforms;
exports.default = _default;
//# sourceMappingURL=transforms.js.map