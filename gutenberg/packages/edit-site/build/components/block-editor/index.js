"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BlockEditor;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _data = require("@wordpress/data");

var _mediaUtils = require("@wordpress/media-utils");

var _coreData = require("@wordpress/core-data");

var _blockEditor = require("@wordpress/block-editor");

var _editor = require("../editor");

var _navigateToLink = _interopRequireDefault(require("../navigate-to-link"));

var _sidebar = require("../sidebar");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function BlockEditor() {
  var _useEditorContext = (0, _editor.useEditorContext)(),
      _settings = _useEditorContext.settings,
      setSettings = _useEditorContext.setSettings;

  var _useSelect = (0, _data.useSelect)(function (select) {
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

  var settings = (0, _element.useMemo)(function () {
    if (!canUserCreateMedia) {
      return _settings;
    }

    return _objectSpread({}, _settings, {
      focusMode: focusMode,
      hasFixedToolbar: hasFixedToolbar,
      mediaUpload: function mediaUpload(_ref) {
        var _onError = _ref.onError,
            rest = (0, _objectWithoutProperties2.default)(_ref, ["onError"]);
        (0, _mediaUtils.uploadMedia)(_objectSpread({
          wpAllowedMimeTypes: _settings.allowedMimeTypes,
          onError: function onError(_ref2) {
            var message = _ref2.message;
            return _onError(message);
          }
        }, rest));
      }
    });
  }, [canUserCreateMedia, _settings, focusMode, hasFixedToolbar]);

  var _useEntityBlockEditor = (0, _coreData.useEntityBlockEditor)('postType', settings.templateType),
      _useEntityBlockEditor2 = (0, _slicedToArray2.default)(_useEntityBlockEditor, 3),
      blocks = _useEntityBlockEditor2[0],
      onInput = _useEntityBlockEditor2[1],
      onChange = _useEntityBlockEditor2[2];

  var setActivePageAndTemplateId = (0, _element.useCallback)(function (_ref3) {
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
  return (0, _element.createElement)(_blockEditor.BlockEditorProvider, {
    settings: settings,
    value: blocks,
    onInput: onInput,
    onChange: onChange,
    useSubRegistry: false
  }, (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts, null), (0, _element.createElement)(_blockEditor.__experimentalLinkControl.ViewerFill, null, (0, _element.useCallback)(function (fillProps) {
    return (0, _element.createElement)(_navigateToLink.default, (0, _extends2.default)({}, fillProps, {
      activePage: settings.page,
      onActivePageAndTemplateIdChange: setActivePageAndTemplateId
    }));
  }, [settings.page, setActivePageAndTemplateId])), (0, _element.createElement)(_sidebar.SidebarInspectorFill, null, (0, _element.createElement)(_blockEditor.BlockInspector, null)), (0, _element.createElement)("div", {
    className: "editor-styles-wrapper edit-site-block-editor__editor-styles-wrapper"
  }, (0, _element.createElement)(_blockEditor.WritingFlow, null, (0, _element.createElement)(_blockEditor.ObserveTyping, null, (0, _element.createElement)(_blockEditor.BlockList, {
    className: "edit-site-block-editor__block-list",
    renderAppender: _blockEditor.ButtonBlockerAppender
  })))));
}
//# sourceMappingURL=index.js.map