"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WidgetAreasBlockEditorProvider;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _mediaUtils = require("@wordpress/media-utils");

var _data = require("@wordpress/data");

var _blocks = require("@wordpress/blocks");

var _blockEditor = require("@wordpress/block-editor");

var _keyboardShortcuts = _interopRequireDefault(require("../keyboard-shortcuts"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var EMPTY_ARRAY = [];

function WidgetAreasBlockEditorProvider(_ref) {
  var blockEditorSettings = _ref.blockEditorSettings,
      props = (0, _objectWithoutProperties2.default)(_ref, ["blockEditorSettings"]);

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        canUser = _select.canUser,
        getEntityRecords = _select.getEntityRecords;

    return {
      areas: getEntityRecords('root', 'widgetArea') || EMPTY_ARRAY,
      hasUploadPermissions: (0, _lodash.defaultTo)(canUser('create', 'media'), true)
    };
  }),
      areas = _useSelect.areas,
      hasUploadPermissions = _useSelect.hasUploadPermissions;

  var _useState = (0, _element.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      blocks = _useState2[0],
      setBlocks = _useState2[1];

  (0, _element.useEffect)(function () {
    if (!areas || !areas.length || blocks.length > 0) {
      return;
    }

    setBlocks(areas.map(function (_ref2) {
      var id = _ref2.id,
          name = _ref2.name;
      return (0, _blocks.createBlock)('core/widget-area', {
        id: id,
        name: name
      });
    }));
  }, [areas, blocks]);
  var settings = (0, _element.useMemo)(function () {
    var mediaUploadBlockEditor;

    if (hasUploadPermissions) {
      mediaUploadBlockEditor = function mediaUploadBlockEditor(_ref3) {
        var _onError = _ref3.onError,
            argumentsObject = (0, _objectWithoutProperties2.default)(_ref3, ["onError"]);
        (0, _mediaUtils.uploadMedia)(_objectSpread({
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
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockEditorKeyboardShortcuts.Register, null), (0, _element.createElement)(_keyboardShortcuts.default.Register, null), (0, _element.createElement)(_components.SlotFillProvider, null, (0, _element.createElement)(_components.DropZoneProvider, null, (0, _element.createElement)(_components.FocusReturnProvider, null, (0, _element.createElement)(_blockEditor.BlockEditorProvider, (0, _extends2.default)({
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