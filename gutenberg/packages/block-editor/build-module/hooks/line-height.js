import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { hasBlockSupport } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import LineHeightControl from '../components/line-height-control';
import { cleanEmptyObject } from './utils';
export var LINE_HEIGHT_SUPPORT_KEY = '__experimentalLineHeight';
/**
 * Inspector control panel containing the line height related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Line height edit element.
 */

export function LineHeightEdit(props) {
  var _style$typography;

  var blockName = props.name,
      style = props.attributes.style;

  if (!hasBlockSupport(blockName, LINE_HEIGHT_SUPPORT_KEY)) {
    return null;
  }

  var onChange = function onChange(newLineHeightValue) {
    var newStyle = _objectSpread({}, style, {
      typography: _objectSpread({}, style === null || style === void 0 ? void 0 : style.typography, {
        lineHeight: newLineHeightValue
      })
    });

    props.setAttributes({
      style: cleanEmptyObject(newStyle)
    });
  };

  return createElement(LineHeightControl, {
    value: style === null || style === void 0 ? void 0 : (_style$typography = style.typography) === null || _style$typography === void 0 ? void 0 : _style$typography.lineHeight,
    onChange: onChange
  });
}
//# sourceMappingURL=line-height.js.map