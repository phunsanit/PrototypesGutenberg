import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { get, isEmpty } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useCallback, useMemo, useState } from '@wordpress/element';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Icon, textColor as textColorIcon } from '@wordpress/icons';
import { removeFormat } from '@wordpress/rich-text';
/**
 * Internal dependencies
 */

import { default as InlineColorUI, getActiveColor } from './inline';
var name = 'core/text-color';

var title = __('Text Color');

var EMPTY_ARRAY = [];

function TextColorEdit(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      isActive = _ref.isActive,
      activeAttributes = _ref.activeAttributes;

  var _useSelect = useSelect(function (select) {
    var blockEditorSelect = select('core/block-editor');
    var settings;

    if (blockEditorSelect && blockEditorSelect.getSettings) {
      settings = blockEditorSelect.getSettings();
    } else {
      settings = {};
    }

    return {
      colors: get(settings, ['colors'], EMPTY_ARRAY),
      disableCustomColors: settings.disableCustomColors
    };
  }),
      colors = _useSelect.colors,
      disableCustomColors = _useSelect.disableCustomColors;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isAddingColor = _useState2[0],
      setIsAddingColor = _useState2[1];

  var enableIsAddingColor = useCallback(function () {
    return setIsAddingColor(true);
  }, [setIsAddingColor]);
  var disableIsAddingColor = useCallback(function () {
    return setIsAddingColor(false);
  }, [setIsAddingColor]);
  var colorIndicatorStyle = useMemo(function () {
    var activeColor = getActiveColor(name, value, colors);

    if (!activeColor) {
      return undefined;
    }

    return {
      backgroundColor: activeColor
    };
  }, [value, colors]);
  var hasColorsToChoose = !isEmpty(colors) || disableCustomColors !== true;

  if (!hasColorsToChoose && !isActive) {
    return null;
  }

  return createElement(Fragment, null, createElement(RichTextToolbarButton, {
    key: isActive ? 'text-color' : 'text-color-not-active',
    className: "format-library-text-color-button",
    name: isActive ? 'text-color' : undefined,
    icon: createElement(Fragment, null, createElement(Icon, {
      icon: textColorIcon
    }), isActive && createElement("span", {
      className: "format-library-text-color-button__indicator",
      style: colorIndicatorStyle
    })),
    title: title // If has no colors to choose but a color is active remove the color onClick
    ,
    onClick: hasColorsToChoose ? enableIsAddingColor : function () {
      return onChange(removeFormat(value, name));
    }
  }), isAddingColor && createElement(InlineColorUI, {
    name: name,
    addingColor: isAddingColor,
    onClose: disableIsAddingColor,
    isActive: isActive,
    activeAttributes: activeAttributes,
    value: value,
    onChange: onChange
  }));
}

export var textColor = {
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
//# sourceMappingURL=index.js.map