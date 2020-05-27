import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEntityProp, useEntityId } from '@wordpress/core-data';
import { useState } from '@wordpress/element';
import { __experimentalGetSettings, dateI18n } from '@wordpress/date';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, Popover, DateTimePicker, PanelBody, CustomSelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function PostDateEditor(_ref) {
  var format = _ref.format,
      setAttributes = _ref.setAttributes;

  var _useEntityProp = useEntityProp('root', 'site', 'date_format'),
      _useEntityProp2 = _slicedToArray(_useEntityProp, 1),
      siteFormat = _useEntityProp2[0];

  var _useEntityProp3 = useEntityProp('postType', 'post', 'date'),
      _useEntityProp4 = _slicedToArray(_useEntityProp3, 2),
      date = _useEntityProp4[0],
      setDate = _useEntityProp4[1];

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPickerOpen = _useState2[0],
      setIsPickerOpen = _useState2[1];

  var settings = __experimentalGetSettings(); // To know if the current time format is a 12 hour time, look for "a".
  // Also make sure this "a" is not escaped by a "/".


  var is12Hour = /a(?!\\)/i.test(settings.formats.time.toLowerCase() // Test only for the lower case "a".
  .replace(/\\\\/g, '') // Replace "//" with empty strings.
  .split('').reverse().join('') // Reverse the string and test for "a" not followed by a slash.
  );
  var formatOptions = Object.values(settings.formats).map(function (formatOption) {
    return {
      key: formatOption,
      name: dateI18n(formatOption, date)
    };
  });
  var resolvedFormat = format || siteFormat || settings.formats.date;
  return date ? createElement("time", {
    dateTime: dateI18n('c', date)
  }, createElement(BlockControls, null, createElement(ToolbarGroup, null, createElement(ToolbarButton, {
    icon: "edit",
    title: __('Change Date'),
    onClick: function onClick() {
      return setIsPickerOpen(function (_isPickerOpen) {
        return !_isPickerOpen;
      });
    }
  }))), dateI18n(resolvedFormat, date), isPickerOpen && createElement(Popover, {
    onClose: setIsPickerOpen.bind(null, false)
  }, createElement(DateTimePicker, {
    currentDate: date,
    onChange: setDate,
    is12Hour: is12Hour
  })), createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Format settings')
  }, createElement(CustomSelectControl, {
    hideLabelFromVision: true,
    label: __('Date Format'),
    options: formatOptions,
    onChange: function onChange(_ref2) {
      var selectedItem = _ref2.selectedItem;
      return setAttributes({
        format: selectedItem.key
      });
    },
    value: formatOptions.find(function (option) {
      return option.key === resolvedFormat;
    })
  })))) : __('No Date');
}

export default function PostDateEdit(_ref3) {
  var format = _ref3.attributes.format,
      setAttributes = _ref3.setAttributes;

  if (!useEntityId('postType', 'post')) {
    return createElement("p", null, 'Jan 1st, 1440');
  }

  return createElement(PostDateEditor, {
    format: format,
    setAttributes: setAttributes
  });
}
//# sourceMappingURL=edit.js.map