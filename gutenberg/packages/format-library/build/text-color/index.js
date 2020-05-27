"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.textColor = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _icons = require("@wordpress/icons");

var _richText = require("@wordpress/rich-text");

var _inline = _interopRequireWildcard(require("./inline"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var name = 'core/text-color';
var title = (0, _i18n.__)('Text Color');
var EMPTY_ARRAY = [];

function TextColorEdit(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      isActive = _ref.isActive,
      activeAttributes = _ref.activeAttributes;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var blockEditorSelect = select('core/block-editor');
    var settings;

    if (blockEditorSelect && blockEditorSelect.getSettings) {
      settings = blockEditorSelect.getSettings();
    } else {
      settings = {};
    }

    return {
      colors: (0, _lodash.get)(settings, ['colors'], EMPTY_ARRAY),
      disableCustomColors: settings.disableCustomColors
    };
  }),
      colors = _useSelect.colors,
      disableCustomColors = _useSelect.disableCustomColors;

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isAddingColor = _useState2[0],
      setIsAddingColor = _useState2[1];

  var enableIsAddingColor = (0, _element.useCallback)(function () {
    return setIsAddingColor(true);
  }, [setIsAddingColor]);
  var disableIsAddingColor = (0, _element.useCallback)(function () {
    return setIsAddingColor(false);
  }, [setIsAddingColor]);
  var colorIndicatorStyle = (0, _element.useMemo)(function () {
    var activeColor = (0, _inline.getActiveColor)(name, value, colors);

    if (!activeColor) {
      return undefined;
    }

    return {
      backgroundColor: activeColor
    };
  }, [value, colors]);
  var hasColorsToChoose = !(0, _lodash.isEmpty)(colors) || disableCustomColors !== true;

  if (!hasColorsToChoose && !isActive) {
    return null;
  }

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.RichTextToolbarButton, {
    key: isActive ? 'text-color' : 'text-color-not-active',
    className: "format-library-text-color-button",
    name: isActive ? 'text-color' : undefined,
    icon: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_icons.Icon, {
      icon: _icons.textColor
    }), isActive && (0, _element.createElement)("span", {
      className: "format-library-text-color-button__indicator",
      style: colorIndicatorStyle
    })),
    title: title // If has no colors to choose but a color is active remove the color onClick
    ,
    onClick: hasColorsToChoose ? enableIsAddingColor : function () {
      return onChange((0, _richText.removeFormat)(value, name));
    }
  }), isAddingColor && (0, _element.createElement)(_inline.default, {
    name: name,
    addingColor: isAddingColor,
    onClose: disableIsAddingColor,
    isActive: isActive,
    activeAttributes: activeAttributes,
    value: value,
    onChange: onChange
  }));
}

var textColor = {
  name: name,
  title: title,
  tagName: 'span',
  className: 'has-inline-color',
  attributes: {
    style: 'style',
    class: 'class'
  },
  edit: TextColorEdit
};
exports.textColor = textColor;
//# sourceMappingURL=index.js.map