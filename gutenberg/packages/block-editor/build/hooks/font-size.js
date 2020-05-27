"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FontSizeEdit = FontSizeEdit;
exports.FONT_SIZE_SUPPORT_KEY = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _hooks = require("@wordpress/hooks");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _tokenList = _interopRequireDefault(require("@wordpress/token-list"));

var _fontSizes = require("../components/font-sizes");

var _utils = require("./utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var FONT_SIZE_SUPPORT_KEY = '__experimentalFontSize';
/**
 * Filters registered block settings, extending attributes to include
 * `fontSize` and `fontWeight` attributes.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */

exports.FONT_SIZE_SUPPORT_KEY = FONT_SIZE_SUPPORT_KEY;

function addAttributes(settings) {
  if (!(0, _blocks.hasBlockSupport)(settings, FONT_SIZE_SUPPORT_KEY)) {
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
  if (!(0, _blocks.hasBlockSupport)(blockType, FONT_SIZE_SUPPORT_KEY)) {
    return props;
  } // Use TokenList to dedupe classes.


  var classes = new _tokenList.default(props.className);
  classes.add((0, _fontSizes.getFontSizeClass)(attributes.fontSize));
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
  if (!(0, _blocks.hasBlockSupport)(settings, FONT_SIZE_SUPPORT_KEY)) {
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


function FontSizeEdit(props) {
  var _style$typography;

  var blockName = props.name,
      _props$attributes = props.attributes,
      fontSize = _props$attributes.fontSize,
      style = _props$attributes.style,
      setAttributes = props.setAttributes;

  var _useSelect = (0, _data.useSelect)(function (select) {
    return select('core/block-editor').getSettings();
  }),
      fontSizes = _useSelect.fontSizes;

  if (!(0, _blocks.hasBlockSupport)(blockName, FONT_SIZE_SUPPORT_KEY)) {
    return null;
  }

  var fontSizeObject = (0, _fontSizes.getFontSize)(fontSizes, fontSize, style === null || style === void 0 ? void 0 : (_style$typography = style.typography) === null || _style$typography === void 0 ? void 0 : _style$typography.fontSize);

  var onChange = function onChange(value) {
    var fontSizeSlug = (0, _fontSizes.getFontSizeObjectByValue)(fontSizes, value).slug;
    setAttributes({
      style: (0, _utils.cleanEmptyObject)(_objectSpread({}, style, {
        typography: _objectSpread({}, style === null || style === void 0 ? void 0 : style.typography, {
          fontSize: fontSizeSlug ? undefined : value
        })
      })),
      fontSize: fontSizeSlug
    });
  };

  return (0, _element.createElement)(_fontSizes.FontSizePicker, {
    value: fontSizeObject.size,
    onChange: onChange
  });
}

(0, _hooks.addFilter)('blocks.registerBlockType', 'core/font/addAttribute', addAttributes);
(0, _hooks.addFilter)('blocks.getSaveContent.extraProps', 'core/font/addSaveProps', addSaveProps);
(0, _hooks.addFilter)('blocks.registerBlockType', 'core/font/addEditProps', addEditProps);
//# sourceMappingURL=font-size.js.map