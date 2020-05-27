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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _memize = _interopRequireDefault(require("memize"));

var _lodash = require("lodash");

var _reactNativeGutenbergBridge = require("react-native-gutenberg-bridge");

var _reactNative = require("react-native");

var _editor = require("@wordpress/editor");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _layout = _interopRequireDefault(require("./components/layout"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Editor = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Editor, _Component);

  var _super = _createSuper(Editor);

  function Editor(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Editor);
    _this = _super.apply(this, arguments);

    if (props.initialHtmlModeEnabled && props.mode === 'visual') {
      // enable html mode if the initial mode the parent wants it but we're not already in it
      _this.props.switchEditorMode('text');
    }

    _this.getEditorSettings = (0, _memize.default)(_this.getEditorSettings, {
      maxSize: 1
    });
    _this.setTitleRef = _this.setTitleRef.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(Editor, [{
    key: "getEditorSettings",
    value: function getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes) {
      settings = _objectSpread({}, settings, {
        isRTL: _reactNative.I18nManager.isRTL,
        hasFixedToolbar: hasFixedToolbar,
        focusMode: focusMode
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
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.subscriptionParentSetFocusOnTitle = (0, _reactNativeGutenbergBridge.subscribeSetFocusOnTitle)(function () {
        if (_this2.postTitleRef) {
          _this2.postTitleRef.focus();
        }
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.subscriptionParentSetFocusOnTitle) {
        this.subscriptionParentSetFocusOnTitle.remove();
      }
    }
  }, {
    key: "setTitleRef",
    value: function setTitleRef(titleRef) {
      this.postTitleRef = titleRef;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          settings = _this$props.settings,
          hasFixedToolbar = _this$props.hasFixedToolbar,
          focusMode = _this$props.focusMode,
          initialEdits = _this$props.initialEdits,
          hiddenBlockTypes = _this$props.hiddenBlockTypes,
          blockTypes = _this$props.blockTypes,
          post = _this$props.post,
          postType = _this$props.postType,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["settings", "hasFixedToolbar", "focusMode", "initialEdits", "hiddenBlockTypes", "blockTypes", "post", "postType"]);
      var editorSettings = this.getEditorSettings(settings, hasFixedToolbar, focusMode, hiddenBlockTypes, blockTypes);
      var normalizedPost = post || {
        id: 1,
        title: {
          raw: props.initialTitle
        },
        content: {
          // make sure the post content is in sync with gutenberg store
          // to avoid marking the post as modified when simply loaded
          // For now, let's assume: serialize( parse( html ) ) !== html
          raw: (0, _blocks.serialize)((0, _blocks.parse)(props.initialHtml || ''))
        },
        type: postType,
        status: 'draft',
        meta: []
      };
      return (0, _element.createElement)(_components.SlotFillProvider, null, (0, _element.createElement)(_components.SiteCapabilitiesContext.Provider, {
        value: this.props.capabilities
      }, (0, _element.createElement)(_editor.EditorProvider, (0, _extends2.default)({
        settings: editorSettings,
        post: normalizedPost,
        initialEdits: initialEdits,
        useSubRegistry: false
      }, props), (0, _element.createElement)(_layout.default, {
        setTitleRef: this.setTitleRef
      }))));
    }
  }]);
  return Editor;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/edit-post'),
      isFeatureActive = _select.isFeatureActive,
      getEditorMode = _select.getEditorMode,
      getPreference = _select.getPreference,
      __experimentalGetPreviewDeviceType = _select.__experimentalGetPreviewDeviceType;

  var _select2 = select('core/blocks'),
      getBlockTypes = _select2.getBlockTypes;

  return {
    hasFixedToolbar: isFeatureActive('fixedToolbar') || __experimentalGetPreviewDeviceType() !== 'Desktop',
    focusMode: isFeatureActive('focusMode'),
    mode: getEditorMode(),
    hiddenBlockTypes: getPreference('hiddenBlockTypes'),
    blockTypes: getBlockTypes()
  };
}), (0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/edit-post'),
      switchEditorMode = _dispatch.switchEditorMode;

  return {
    switchEditorMode: switchEditorMode
  };
})])(Editor);

exports.default = _default;
//# sourceMappingURL=editor.native.js.map