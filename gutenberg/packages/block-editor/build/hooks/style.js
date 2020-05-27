"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInlineStyles = getInlineStyles;
exports.addSaveProps = addSaveProps;
exports.addEditProps = addEditProps;
exports.withBlockControls = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _hooks = require("@wordpress/hooks");

var _blocks = require("@wordpress/blocks");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _inspectorControls = _interopRequireDefault(require("../components/inspector-controls"));

var _color = require("./color");

var _lineHeight = require("./line-height");

var _fontSize = require("./font-size");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var styleSupportKeys = [_color.COLOR_SUPPORT_KEY, _lineHeight.LINE_HEIGHT_SUPPORT_KEY, _fontSize.FONT_SIZE_SUPPORT_KEY];
var typographySupportKeys = [_lineHeight.LINE_HEIGHT_SUPPORT_KEY, _fontSize.FONT_SIZE_SUPPORT_KEY];

var hasStyleSupport = function hasStyleSupport(blockType) {
  return styleSupportKeys.some(function (key) {
    return (0, _blocks.hasBlockSupport)(blockType, key);
  });
};
/**
 * Returns the inline styles to add depending on the style object
 *
 * @param  {Object} styles Styles configuration
 * @return {Object}        Flattened CSS variables declaration
 */


function getInlineStyles() {
  var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var mappings = {
    lineHeight: ['typography', 'lineHeight'],
    fontSize: ['typography', 'fontSize'],
    background: ['color', 'gradient'],
    backgroundColor: ['color', 'background'],
    color: ['color', 'text']
  };
  var output = {};
  Object.entries(mappings).forEach(function (_ref) {
    var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        styleKey = _ref2[0],
        objectKey = _ref2[1];

    if ((0, _lodash.has)(styles, objectKey)) {
      output[styleKey] = (0, _lodash.get)(styles, objectKey);
    }
  });
  return output;
}
/**
 * Filters registered block settings, extending attributes to include `style` attribute.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */


function addAttribute(settings) {
  if (!hasStyleSupport(settings)) {
    return settings;
  } // allow blocks to specify their own attribute definition with default values if needed.


  if (!settings.attributes.style) {
    Object.assign(settings.attributes, {
      style: {
        type: 'object'
      }
    });
  }

  return settings;
}
/**
 * Override props assigned to save component to inject the CSS variables definition.
 *
 * @param  {Object} props      Additional props applied to save element
 * @param  {Object} blockType  Block type
 * @param  {Object} attributes Block attributes
 * @return {Object}            Filtered props applied to save element
 */


function addSaveProps(props, blockType, attributes) {
  if (!hasStyleSupport(blockType)) {
    return props;
  }

  var style = attributes.style;
  props.style = _objectSpread({}, getInlineStyles(style), {}, props.style);
  return props;
}
/**
 * Filters registered block settings to extand the block edit wrapper
 * to apply the desired styles and classnames properly.
 *
 * @param  {Object} settings Original block settings
 * @return {Object}          Filtered block settings
 */


function addEditProps(settings) {
  if (!hasStyleSupport(settings)) {
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
 * Override the default edit UI to include new inspector controls for
 * all the custom styles configs.
 *
 * @param  {Function} BlockEdit Original component
 * @return {Function}           Wrapped component
 */


var withBlockControls = (0, _compose.createHigherOrderComponent)(function (BlockEdit) {
  return function (props) {
    var blockName = props.name;
    var hasTypographySupport = typographySupportKeys.some(function (key) {
      return (0, _blocks.hasBlockSupport)(blockName, key);
    });
    return [_element.Platform.OS === 'web' && hasTypographySupport && (0, _element.createElement)(_inspectorControls.default, {
      key: "typography"
    }, (0, _element.createElement)(_components.PanelBody, {
      title: (0, _i18n.__)('Typography')
    }, (0, _element.createElement)(_fontSize.FontSizeEdit, props), (0, _element.createElement)(_lineHeight.LineHeightEdit, props))), (0, _element.createElement)(_color.ColorEdit, (0, _extends2.default)({
      key: "colors"
    }, props)), (0, _element.createElement)(BlockEdit, (0, _extends2.default)({
      key: "edit"
    }, props))];
  };
}, 'withToolbarControls');
exports.withBlockControls = withBlockControls;
(0, _hooks.addFilter)('blocks.registerBlockType', 'core/style/addAttribute', addAttribute);
(0, _hooks.addFilter)('blocks.getSaveContent.extraProps', 'core/style/addSaveProps', addSaveProps);
(0, _hooks.addFilter)('blocks.registerBlockType', 'core/style/addEditProps', addEditProps);
(0, _hooks.addFilter)('editor.BlockEdit', 'core/style/with-block-controls', withBlockControls);
//# sourceMappingURL=style.js.map