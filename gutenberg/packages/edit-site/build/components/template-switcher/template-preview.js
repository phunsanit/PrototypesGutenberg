"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

/**
 * WordPress dependencies
 */
function TemplatePreview(_ref) {
  var item = _ref.item;
  var template = (0, _data.useSelect)(function (select) {
    return select('core').getEntityRecord('postType', item.type === 'template' ? 'wp_template' : 'wp_template_part', item.id);
  }, [item]);
  var blocks = (0, _element.useMemo)(function () {
    var _template$content;

    return template ? (0, _blocks.parse)((template === null || template === void 0 ? void 0 : (_template$content = template.content) === null || _template$content === void 0 ? void 0 : _template$content.raw) || '') : [];
  }, [template]);
  return (0, _element.createElement)("div", {
    className: "edit-site-template-switcher__template-preview"
  }, !!blocks && (0, _element.createElement)(_blockEditor.BlockPreview, {
    blocks: blocks,
    viewportWidth: 1200
  }));
}

var _default = TemplatePreview;
exports.default = _default;
//# sourceMappingURL=template-preview.js.map