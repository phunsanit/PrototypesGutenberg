import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { PlainText, __experimentalBlock as Block } from '@wordpress/block-editor';
export default function SiteTitleEdit() {
  var _useEntityProp = useEntityProp('root', 'site', 'title'),
      _useEntityProp2 = _slicedToArray(_useEntityProp, 2),
      title = _useEntityProp2[0],
      setTitle = _useEntityProp2[1];

  return createElement(PlainText, {
    __experimentalVersion: 2,
    tagName: Block.h1,
    placeholder: __('Site Title'),
    value: title,
    onChange: setTitle,
    disableLineBreaks: true
  });
}
//# sourceMappingURL=edit.js.map