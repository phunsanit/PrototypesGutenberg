import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import { defaultTo } from 'lodash';
/**
 * WordPress dependencies
 */

import { DropZoneProvider, SlotFillProvider, FocusReturnProvider } from '@wordpress/components';
import { uploadMedia } from '@wordpress/media-utils';
import { useSelect } from '@wordpress/data';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { BlockEditorProvider, BlockEditorKeyboardShortcuts } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import KeyboardShortcuts from '../keyboard-shortcuts';
var EMPTY_ARRAY = [];
export default function WidgetAreasBlockEditorProvider(_ref) {
  var blockEditorSettings = _ref.blockEditorSettings,
      props = _objectWithoutProperties(_ref, ["blockEditorSettings"]);

  var _useSelect = useSelect(function (select) {
    var _select = select('core'),
        canUser = _select.canUser,
        getEntityRecords = _select.getEntityRecords;

    return {
      areas: getEntityRecords('root', 'widgetArea') || EMPTY_ARRAY,
      hasUploadPermissions: defaultTo(canUser('create', 'media'), true)
    };
  }),
      areas = _useSelect.areas,
      hasUploadPermissions = _useSelect.hasUploadPermissions;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      blocks = _useState2[0],
      setBlocks = _useState2[1];

  useEffect(function () {
    if (!areas || !areas.length || blocks.length > 0) {
      return;
    }

    setBlocks(areas.map(function (_ref2) {
      var id = _ref2.id,
          name = _ref2.name;
      return createBlock('core/widget-area', {
        id: id,
        name: name
      });
    }));
  }, [areas, blocks]);
  var settings = useMemo(function () {
    var mediaUploadBlockEditor;

    if (hasUploadPermissions) {
      mediaUploadBlockEditor = function mediaUploadBlockEditor(_ref3) {
        var _onError = _ref3.onError,
            argumentsObject = _objectWithoutProperties(_ref3, ["onError"]);

        uploadMedia(_objectSpread({
          wpAllowedMimeTypes: blockEditorSettings.allowedMimeTypes,
          onError: function onError(_ref4) {
            var message = _ref4.message;
            return _onError(message);
          }
        }, argumentsObject));
      };
    }

    return _objectSpread({}, blockEditorSettings, {
      mediaUpload: mediaUploadBlockEditor,
      templateLock: 'all'
    });
  }, [blockEditorSettings, hasUploadPermissions]);
  return createElement(Fragment, null, createElement(BlockEditorKeyboardShortcuts.Register, null), createElement(KeyboardShortcuts.Register, null), createElement(SlotFillProvider, null, createElement(DropZoneProvider, null, createElement(FocusReturnProvider, null, createElement(BlockEditorProvider, _extends({
    value: blocks,
    onInput: function onInput(newBlocks) {
      return setBlocks(newBlocks);
    },
    onChange: function onChange(newBlocks) {
      return setBlocks(newBlocks);
    },
    settings: settings
  }, props))))));
}
//# sourceMappingURL=index.js.map