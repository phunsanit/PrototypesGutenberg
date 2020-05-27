import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { parse } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { BlockPreview } from '@wordpress/block-editor';
import { useMemo } from '@wordpress/element';

function TemplatePreview(_ref) {
  var item = _ref.item;
  var template = useSelect(function (select) {
    return select('core').getEntityRecord('postType', item.type === 'template' ? 'wp_template' : 'wp_template_part', item.id);
  }, [item]);
  var blocks = useMemo(function () {
    var _template$content;

    return template ? parse((template === null || template === void 0 ? void 0 : (_template$content = template.content) === null || _template$content === void 0 ? void 0 : _template$content.raw) || '') : [];
  }, [template]);
  return createElement("div", {
    className: "edit-site-template-switcher__template-preview"
  }, !!blocks && createElement(BlockPreview, {
    blocks: blocks,
    viewportWidth: 1200
  }));
}

export default TemplatePreview;
//# sourceMappingURL=template-preview.js.map