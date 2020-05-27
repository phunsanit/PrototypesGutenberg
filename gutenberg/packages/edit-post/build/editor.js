"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _memize = _interopRequireDefault(require("memize"));

var _lodash = require("lodash");

var _data = require("@wordpress/data");

var _editor = require("@wordpress/editor");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _preventEventDiscovery = _interopRequireDefault(require("./prevent-event-discovery"));

var _layout = _interopRequireDefault(require("./components/layout"));

var _editorInitialization = _interopRequireDefault(require("./components/editor-initialization"));

var _editPostSettings = _interopRequireDefault(require("./components/edit-post-settings"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Editor = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Editor, _Component);

  var _super = _createSuper(Editor);

  function Editor() {
    var _this;

    (0, _classCallCheck2.default)(this, Editor);
    _this = _super.apply(this, arguments);
    _this.getEditorSettings = (0, _memize.default)(_this.getEditorSettings, {
      maxSize: 1
    });
    return _this;
  }

  (0, _createClass2.default)(Editor, [{
    key: "getEditorSettings",
    value: function getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes, preferredStyleVariations, __experimentalLocalAutosaveInterval, updatePreferredStyleVariations) {
      settings = _objectSpread({}, settings, {
        __experimentalPreferredStyleVariations: {
          value: preferredStyleVariations,
          onChange: updatePreferredStyleVariations
        },
        hasFixedToolbar: hasFixedToolbar,
        focusMode: focusMode,
        __experimentalLocalAutosaveInterval: __experimentalLocalAutosaveInterval
      }); // Omit hidden block types if exists and non-empty.

      if ((0, _lodash.size)(hiddenBlockTypes) > 0) {
        // Defer to passed setting for `allowedBlockTypes` if provided as
        // anything other than `true` (where `true` is equivalent to allow
        // all block types).
        var defaultAllowedBlockTypes = true === settings.allowedBlockTypes ? (0, _lodash.map)(blockTypes, 'name') : settings.allowedBlockTypes || [];
        settings.allowedBlockTypes = _lodash.without.apply(void 0, [defaultAllowedBlockTypes].concat((0, _toConsumableArray2.default)(hiddenBlockTypes)));
      }

      return settings;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          settings = _this$props.settings,
          hasFixedToolbar = _this$props.hasFixedToolbar,
          focusMode = _this$props.focusMode,
          post = _this$props.post,
          postId = _this$props.postId,
          initialEdits = _this$props.initialEdits,
          onError = _this$props.onError,
          hiddenBlockTypes = _this$props.hiddenBlockTypes,
          blockTypes = _this$props.blockTypes,
          preferredStyleVariations = _this$props.preferredStyleVariations,
          __experimentalLocalAutosaveInterval = _this$props.__experimentalLocalAutosaveInterval,
          updatePreferredStyleVariations = _this$props.updatePreferredStyleVariations,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["settings", "hasFixedToolbar", "focusMode", "post", "postId", "initialEdits", "onError", "hiddenBlockTypes", "blockTypes", "preferredStyleVariations", "__experimentalLocalAutosaveInterval", "updatePreferredStyleVariations"]);

      if (!post) {
        return null;
      }

      var editorSettings = this.getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes, preferredStyleVariations, __experimentalLocalAutosaveInterval, updatePreferredStyleVariations);
      return (0, _element.createElement)(_element.StrictMode, null, (0, _element.createElement)(_editPostSettings.default.Provider, {
        value: settings
      }, (0, _element.createElement)(_components.SlotFillProvider, null, (0, _element.createElement)(_components.DropZoneProvider, null, (0, _element.createElement)(_editor.EditorProvider, (0, _extends2.default)({
        settings: editorSettings,
        post: post,
        initialEdits: initialEdits,
        useSubRegistry: false
      }, props), (0, _element.createElement)(_editor.ErrorBoundary, {
        onError: onError
      }, (0, _element.createElement)(_editorInitialization.default, {
        postId: postId
      }), (0, _element.createElement)(_layout.default, null), (0, _element.createElement)(_components.KeyboardShortcuts, {
        shortcuts: _preventEventDiscovery.default
      })), (0, _element.createElement)(_editor.PostLockedModal, null))))));
    }
  }]);
  return Editor;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref) {
  var postId = _ref.postId,
      postType = _ref.postType;

  var _select = select('core/edit-post'),
      isFeatureActive = _select.isFeatureActive,
      getPreference = _select.getPreference,
      __experimentalGetPreviewDeviceType = _select.__experimentalGetPreviewDeviceType;

  var _select2 = select('core'),
      getEntityRecord = _select2.getEntityRecord;

  var _select3 = select('core/blocks'),
      getBlockTypes = _select3.getBlockTypes;

  return {
    hasFixedToolbar: isFeatureActive('fixedToolbar') || __experimentalGetPreviewDeviceType() !== 'Desktop',
    focusMode: isFeatureActive('focusMode'),
    post: getEntityRecord('postType', postType, postId),
    preferredStyleVariations: getPreference('preferredStyleVariations'),
    hiddenBlockTypes: getPreference('hiddenBlockTypes'),
    blockTypes: getBlockTypes(),
    __experimentalLocalAutosaveInterval: getPreference('localAutosaveInterval')
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      updatePreferredStyleVariations = _dispatch.updatePreferredStyleVariations;

  return {
    updatePreferredStyleVariations: updatePreferredStyleVariations
  };
})])(Editor);

exports.default = _default;
//# sourceMappingURL=editor.js.map