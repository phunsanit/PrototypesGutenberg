"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActiveColor = getActiveColor;
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _components = require("@wordpress/components");

var _dom = require("@wordpress/dom");

var _richText = require("@wordpress/rich-text");

var _blockEditor = require("@wordpress/block-editor");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function getActiveColor(formatName, formatValue, colors) {
  var activeColorFormat = (0, _richText.getActiveFormat)(formatValue, formatName);

  if (!activeColorFormat) {
    return;
  }

  var styleColor = activeColorFormat.attributes.style;

  if (styleColor) {
    return styleColor.replace(new RegExp("^color:\\s*"), '');
  }

  var currentClass = activeColorFormat.attributes.class;

  if (currentClass) {
    var colorSlug = currentClass.replace(/.*has-(.*?)-color.*/, '$1');
    return (0, _blockEditor.getColorObjectByAttributeValues)(colors, colorSlug).color;
  }
}

var ColorPopoverAtLink = function ColorPopoverAtLink(_ref) {
  var addingColor = _ref.addingColor,
      props = (0, _objectWithoutProperties2.default)(_ref, ["addingColor"]);
  // There is no way to open a text formatter popover when another one is mounted.
  // The first popover will always be dismounted when a click outside happens, so we can store the
  // anchor Rect during the lifetime of the component.
  var anchorRect = (0, _element.useMemo)(function () {
    var selection = window.getSelection();
    var range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    if (!range) {
      return;
    }

    if (addingColor) {
      return (0, _dom.getRectangleFromRange)(range);
    }

    var element = range.startContainer; // If the caret is right before the element, select the next element.

    element = element.nextElementSibling || element;

    while (element.nodeType !== window.Node.ELEMENT_NODE) {
      element = element.parentNode;
    }

    var closest = element.closest('span');

    if (closest) {
      return closest.getBoundingClientRect();
    }
  }, []);

  if (!anchorRect) {
    return null;
  }

  return (0, _element.createElement)(_blockEditor.URLPopover, (0, _extends2.default)({
    anchorRect: anchorRect
  }, props));
};

var ColorPicker = function ColorPicker(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      onChange = _ref2.onChange;
  var colors = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getSettings = _select.getSettings;

    return (0, _lodash.get)(getSettings(), ['colors'], []);
  });
  var onColorChange = (0, _element.useCallback)(function (color) {
    if (color) {
      var colorObject = (0, _blockEditor.getColorObjectByColorValue)(colors, color);
      onChange((0, _richText.applyFormat)(value, {
        type: name,
        attributes: colorObject ? {
          class: (0, _blockEditor.getColorClassName)('color', colorObject.slug)
        } : {
          style: "color:".concat(color)
        }
      }));
    } else {
      onChange((0, _richText.removeFormat)(value, name));
    }
  }, [colors, onChange]);
  var activeColor = (0, _element.useMemo)(function () {
    return getActiveColor(name, value, colors);
  }, [name, value, colors]);
  return (0, _element.createElement)(_blockEditor.ColorPalette, {
    value: activeColor,
    onChange: onColorChange
  });
};

var InlineColorUI = function InlineColorUI(_ref3) {
  var name = _ref3.name,
      value = _ref3.value,
      onChange = _ref3.onChange,
      onClose = _ref3.onClose,
      isActive = _ref3.isActive,
      addingColor = _ref3.addingColor;
  return (0, _element.createElement)(ColorPopoverAtLink, {
    value: value,
    isActive: isActive,
    addingColor: addingColor,
    onClose: onClose,
    className: "components-inline-color-popover"
  }, (0, _element.createElement)(ColorPicker, {
    name: name,
    value: value,
    onChange: onChange
  }));
};

var _default = (0, _components.withSpokenMessages)(InlineColorUI);

exports.default = _default;
//# sourceMappingURL=inline.js.map