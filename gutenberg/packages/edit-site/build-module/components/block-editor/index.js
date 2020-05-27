import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useMemo, useCallback } from '@wordpress/element';
import { uploadMedia } from '@wordpress/media-utils';
import { useEntityBlockEditor } from '@wordpress/core-data';
import { BlockEditorProvider, BlockEditorKeyboardShortcuts, __experimentalLinkControl, BlockInspector, WritingFlow, ObserveTyping, BlockList, ButtonBlockerAppender } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import { useEditorContext } from '../editor';
import NavigateToLink from '../navigate-to-link';
import { SidebarInspectorFill } from '../sidebar';
export default function BlockEditor() {
  var _useEditorContext = useEditorContext(),
      _settings = _useEditorContext.settings,
      setSettings = _useEditorContext.setSettings;

  var _useSelect = useSelect(function (select) {
    var _select = select('core/edit-site'),
        isFeatureActive = _select.isFeatureActive;

    var _canUserCreateMedia = select('core').canUser('create', 'media');

    return {
      canUserCreateMedia: _canUserCreateMedia || _canUserCreateMedia !== false,
      focusMode: isFeatureActive('focusMode'),
      hasFixedToolbar: isFeatureActive('fixedToolbar')
    };
  }, []),
      canUserCreateMedia = _useSelect.canUserCreateMedia,
      focusMode = _useSelect.focusMode,
      hasFixedToolbar = _useSelect.hasFixedToolbar;

  var settings = useMemo(function () {
    if (!canUserCreateMedia) {
      return _settings;
    }

    return _objectSpread({}, _settings, {
      focusMode: focusMode,
      hasFixedToolbar: hasFixedToolbar,
      mediaUpload: function mediaUpload(_ref) {
        var _onError = _ref.onError,
            rest = _objectWithoutProperties(_ref, ["onError"]);

        uploadMedia(_objectSpread({
          wpAllowedMimeTypes: _settings.allowedMimeTypes,
          onError: function onError(_ref2) {
            var message = _ref2.message;
            return _onError(message);
          }
        }, rest));
      }
    });
  }, [canUserCreateMedia, _settings, focusMode, hasFixedToolbar]);

  var _useEntityBlockEditor = useEntityBlockEditor('postType', settings.templateType),
      _useEntityBlockEditor2 = _slicedToArray(_useEntityBlockEditor, 3),
      blocks = _useEntityBlockEditor2[0],
      onInput = _useEntityBlockEditor2[1],
      onChange = _useEntityBlockEditor2[2];

  var setActivePageAndTemplateId = useCallback(function (_ref3) {
    var page = _ref3.page,
        templateId = _ref3.templateId;
    return setSettings(function (prevSettings) {
      return _objectSpread({}, prevSettings, {
        page: page,
        templateId: templateId,
        templateType: 'wp_template'
      });
    });
  }, []);
  return createElement(BlockEditorProvider, {
    settings: settings,
    value: blocks,
    onInput: onInput,
    onChange: onChange,
    useSubRegistry: false
  }, createElement(BlockEditorKeyboardShortcuts, null), createElement(__experimentalLinkControl.ViewerFill, null, useCallback(function (fillProps) {
    return createElement(NavigateToLink, _extends({}, fillProps, {
      activePage: settings.page,
      onActivePageAndTemplateIdChange: setActivePageAndTemplateId
    }));
  }, [settings.page, setActivePageAndTemplateId])), createElement(SidebarInspectorFill, null, createElement(BlockInspector, null)), createElement("div", {
    className: "editor-styles-wrapper edit-site-block-editor__editor-styles-wrapper"
  }, createElement(WritingFlow, null, createElement(ObserveTyping, null, createElement(BlockList, {
    className: "edit-site-block-editor__block-list",
    renderAppender: ButtonBlockerAppender
  })))));
}
//# sourceMappingURL=index.js.map