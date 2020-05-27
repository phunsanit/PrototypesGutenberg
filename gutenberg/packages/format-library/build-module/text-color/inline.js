import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { useCallback, useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { withSpokenMessages } from '@wordpress/components';
import { getRectangleFromRange } from '@wordpress/dom';
import { applyFormat, removeFormat, getActiveFormat } from '@wordpress/rich-text';
import { ColorPalette, URLPopover, getColorClassName, getColorObjectByColorValue, getColorObjectByAttributeValues } from '@wordpress/block-editor';
export function getActiveColor(formatName, formatValue, colors) {
  var activeColorFormat = getActiveFormat(formatValue, formatName);

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
    return getColorObjectByAttributeValues(colors, colorSlug).color;
  }
}

var ColorPopoverAtLink = function ColorPopoverAtLink(_ref) {
  var addingColor = _ref.addingColor,
      props = _objectWithoutProperties(_ref, ["addingColor"]);

  // There is no way to open a text formatter popover when another one is mounted.
  // The first popover will always be dismounted when a click outside happens, so we can store the
  // anchor Rect during the lifetime of the component.
  var anchorRect = useMemo(function () {
    var selection = window.getSelection();
    var range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    if (!range) {
      return;
    }

    if (addingColor) {
      return getRectangleFromRange(range);
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

  return createElement(URLPopover, _extends({
    anchorRect: anchorRect
  }, props));
};

var ColorPicker = function ColorPicker(_ref2) {
  var name = _ref2.name,
      value = _ref2.value,
      onChange = _ref2.onChange;
  var colors = useSelect(function (select) {
    var _select = select('core/block-editor'),
        getSettings = _select.getSettings;

    return get(getSettings(), ['colors'], []);
  });
  var onColorChange = useCallback(function (color) {
    if (color) {
      var colorObject = getColorObjectByColorValue(colors, color);
      onChange(applyFormat(value, {
        type: name,
        attributes: colorObject ? {
          class: getColorClassName('color', colorObject.slug)
        } : {
          style: "color:".concat(color)
        }
      }));
    } else {
      onChange(removeFormat(value, name));
    }
  }, [colors, onChange]);
  var activeColor = useMemo(function () {
    return getActiveColor(name, value, colors);
  }, [name, value, colors]);
  return createElement(ColorPalette, {
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
  return createElement(ColorPopoverAtLink, {
    value: value,
    isActive: isActive,
    addingColor: addingColor,
    onClose: onClose,
    className: "components-inline-color-popover"
  }, createElement(ColorPicker, {
    name: name,
    value: value,
    onChange: onChange
  }));
};

export default withSpokenMessages(InlineColorUI);
//# sourceMappingURL=inline.js.map