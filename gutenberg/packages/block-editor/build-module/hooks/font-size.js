import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { hasBlockSupport } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import TokenList from '@wordpress/token-list';
/**
 * Internal dependencies
 */

import { getFontSize, getFontSizeClass, getFontSizeObjectByValue, FontSizePicker } from '../components/font-sizes';
import { cleanEmptyObject } from './utils';
export var FONT_SIZE_SUPPORT_KEY = '__experimentalFontSize';
/**
 * Filters registered block settings, extending attributes to include
 * `fontSize` and `fontWeight` attributes.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */

function addAttributes(settings) {
  if (!hasBlockSupport(settings, FONT_SIZE_SUPPORT_KEY)) {
    return settings;
  } // Allow blocks to specify a default value if needed.


  if (!settings.attributes.fontSize) {
    Object.assign(settings.attributes, {
      fontSize: {
        type: 'string'
      }
    });
  }

  return settings;
}
/**
 * Override props assigned to save component to inject font size.
 *
 * @param  {Object} props      Additional props applied to save element
 * @param  {Object} blockType  Block type
 * @param  {Object} attributes Block attributes
 * @return {Object}            Filtered props applied to save element
 */


function addSaveProps(props, blockType, attributes) {
  if (!hasBlockSupport(blockType, FONT_SIZE_SUPPORT_KEY)) {
    return props;
  } // Use TokenList to dedupe classes.


  var classes = new TokenList(props.className);
  classes.add(getFontSizeClass(attributes.fontSize));
  var newClassName = classes.value;
  props.className = newClassName ? newClassName : undefined;
  return props;
}
/**
 * Filters registered block settings to expand the block edit wrapper
 * by applying the desired styles and classnames.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */


function addEditProps(settings) {
  if (!hasBlockSupport(settings, FONT_SIZE_SUPPORT_KEY)) {
    return settings;
  }

  var existingGetEditWrapperProps = settings.getEditWrapperProps;

  settings.getEditWrapperProps = function (attributes) {
    var props = {};

    if (existingGetEditWrapperProps) {
      props = existingGetEditWrapperProps(attributes);
    }

    return addSaveProps(props, settings, attributes);
  };

  return settings;
}
/**
 * Inspector control panel containing the font size related configuration
 *
 * @param {Object} props
 *
 * @return {WPElement} Font size edit element.
 */


export function FontSizeEdit(props) {
  var _style$typography;

  var blockName = props.name,
      _props$attributes = props.attributes,
      fontSize = _props$attributes.fontSize,
      style = _props$attributes.style,
      setAttributes = props.setAttributes;

  var _useSelect = useSelect(function (select) {
    return select('core/block-editor').getSettings();
  }),
      fontSizes = _useSelect.fontSizes;

  if (!hasBlockSupport(blockName, FONT_SIZE_SUPPORT_KEY)) {
    return null;
  }

  var fontSizeObject = getFontSize(fontSizes, fontSize, style === null || style === void 0 ? void 0 : (_style$typography = style.typography) === null || _style$typography === void 0 ? void 0 : _style$typography.fontSize);

  var onChange = function onChange(value) {
    var fontSizeSlug = getFontSizeObjectByValue(fontSizes, value).slug;
    setAttributes({
      style: cleanEmptyObject(_objectSpread({}, style, {
        typography: _objectSpread({}, style === null || style === void 0 ? void 0 : style.typography, {
          fontSize: fontSizeSlug ? undefined : value
        })
      })),
      fontSize: fontSizeSlug
    });
  };

  return createElement(FontSizePicker, {
    value: fontSizeObject.size,
    onChange: onChange
  });
}
addFilter('blocks.registerBlockType', 'core/font/addAttribute', addAttributes);
addFilter('blocks.getSaveContent.extraProps', 'core/font/addSaveProps', addSaveProps);
addFilter('blocks.registerBlockType', 'core/font/addEditProps', addEditProps);
//# sourceMappingURL=font-size.js.map