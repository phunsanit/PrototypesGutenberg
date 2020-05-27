import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { BlockControls, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import LevelToolbar from './level-toolbar';
export default function SiteTitleEdit(_ref) {
  var level = _ref.attributes.level,
      setAttributes = _ref.setAttributes;

  var _useEntityProp = useEntityProp('root', 'site', 'title'),
      _useEntityProp2 = _slicedToArray(_useEntityProp, 2),
      title = _useEntityProp2[0],
      setTitle = _useEntityProp2[1];

  var tagName = level === 0 ? 'p' : "h".concat(level);
  return createElement(Fragment, null, createElement(BlockControls, null, createElement(LevelToolbar, {
    level: level,
    onChange: function onChange(newLevel) {
      return setAttributes({
        level: newLevel
      });
    }
  })), createElement(RichText, {
    tagName: tagName,
    placeholder: __('Site Title'),
    value: title,
    onChange: setTitle,
    allowedFormats: []
  }));
}
//# sourceMappingURL=index.js.map