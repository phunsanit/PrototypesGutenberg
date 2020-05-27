"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNative = require("react-native");

var _reactNativeSafeArea = _interopRequireDefault(require("react-native-safe-area"));

var _reactNativeGutenbergBridge = require("react-native-gutenberg-bridge");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _editor = require("@wordpress/editor");

var _style = _interopRequireDefault(require("./style.scss"));

var _style2 = _interopRequireDefault(require("../header/header-toolbar/style.scss"));

var _header = _interopRequireDefault(require("../header"));

var _visualEditor = _interopRequireDefault(require("../visual-editor"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Layout = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Layout, _Component);

  var _super = _createSuper(Layout);

  function Layout() {
    var _this;

    (0, _classCallCheck2.default)(this, Layout);
    _this = _super.apply(this, arguments);
    _this.onSafeAreaInsetsUpdate = _this.onSafeAreaInsetsUpdate.bind((0, _assertThisInitialized2.default)(_this));
    _this.onRootViewLayout = _this.onRootViewLayout.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      rootViewHeight: 0,
      safeAreaInsets: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      }
    };

    _reactNativeSafeArea.default.getSafeAreaInsetsForRootView().then(_this.onSafeAreaInsetsUpdate);

    return _this;
  }

  (0, _createClass2.default)(Layout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;

      _reactNativeSafeArea.default.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _reactNativeSafeArea.default.removeEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);

      this._isMounted = false;
    }
  }, {
    key: "onSafeAreaInsetsUpdate",
    value: function onSafeAreaInsetsUpdate(result) {
      var safeAreaInsets = result.safeAreaInsets;

      if (this._isMounted) {
        this.setState({
          safeAreaInsets: safeAreaInsets
        });
      }
    }
  }, {
    key: "onRootViewLayout",
    value: function onRootViewLayout(event) {
      if (this._isMounted) {
        this.setHeightState(event);
      }
    }
  }, {
    key: "setHeightState",
    value: function setHeightState(event) {
      var height = event.nativeEvent.layout.height;
      this.setState({
        rootViewHeight: height
      }, _reactNativeGutenbergBridge.sendNativeEditorDidLayout);
    }
  }, {
    key: "renderHTML",
    value: function renderHTML() {
      return (0, _element.createElement)(_components.HTMLTextInput, {
        parentHeight: this.state.rootViewHeight
      });
    }
  }, {
    key: "renderVisual",
    value: function renderVisual() {
      var isReady = this.props.isReady;

      if (!isReady) {
        return null;
      }

      return (0, _element.createElement)(_visualEditor.default, {
        setTitleRef: this.props.setTitleRef
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          getStylesFromColorScheme = _this$props.getStylesFromColorScheme,
          isTemplatePickerAvailable = _this$props.isTemplatePickerAvailable,
          isTemplatePickerVisible = _this$props.isTemplatePickerVisible,
          mode = _this$props.mode;
      var isHtmlView = mode === 'text'; // add a margin view at the bottom for the header

      var marginBottom = _reactNative.Platform.OS === 'android' && !isHtmlView ? _style2.default.container.height : 0;

      var toolbarKeyboardAvoidingViewStyle = _objectSpread({}, _style.default.toolbarKeyboardAvoidingView, {
        left: this.state.safeAreaInsets.left,
        right: this.state.safeAreaInsets.right,
        bottom: this.state.safeAreaInsets.bottom
      });

      return (0, _element.createElement)(_reactNative.SafeAreaView, {
        style: getStylesFromColorScheme(_style.default.container, _style.default.containerDark),
        onLayout: this.onRootViewLayout
      }, (0, _element.createElement)(_editor.AutosaveMonitor, null), (0, _element.createElement)(_reactNative.View, {
        style: getStylesFromColorScheme(_style.default.background, _style.default.backgroundDark)
      }, isHtmlView ? this.renderHTML() : this.renderVisual(), !isHtmlView && _reactNative.Platform.OS === 'android' && (0, _element.createElement)(_blockEditor.FloatingToolbar, null)), (0, _element.createElement)(_reactNative.View, {
        style: {
          flex: 0,
          flexBasis: marginBottom,
          height: marginBottom
        }
      }), !isHtmlView && (0, _element.createElement)(_components.KeyboardAvoidingView, {
        parentHeight: this.state.rootViewHeight,
        style: toolbarKeyboardAvoidingViewStyle
      }, isTemplatePickerAvailable && (0, _element.createElement)(_blockEditor.__experimentalPageTemplatePicker, {
        visible: isTemplatePickerVisible
      }), _reactNative.Platform.OS === 'ios' && (0, _element.createElement)(_blockEditor.FloatingToolbar, null), (0, _element.createElement)(_header.default, null), (0, _element.createElement)(_blockEditor.BottomSheetSettings, null)));
    }
  }]);
  return Layout;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select) {
  var _select = select('core/editor'),
      isEditorReady = _select.__unstableIsEditorReady;

  var _select2 = select('core/edit-post'),
      getEditorMode = _select2.getEditorMode;

  return {
    isReady: isEditorReady(),
    mode: getEditorMode()
  };
}), _compose.withPreferredColorScheme, _blockEditor.__experimentalWithPageTemplatePicker])(Layout);

exports.default = _default;
//# sourceMappingURL=index.native.js.map