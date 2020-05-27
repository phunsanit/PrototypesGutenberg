import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { Platform, SafeAreaView, View } from 'react-native';
import SafeArea from 'react-native-safe-area';
import { sendNativeEditorDidLayout } from 'react-native-gutenberg-bridge';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { BottomSheetSettings, __experimentalPageTemplatePicker, __experimentalWithPageTemplatePicker, FloatingToolbar } from '@wordpress/block-editor';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { HTMLTextInput, KeyboardAvoidingView } from '@wordpress/components';
import { AutosaveMonitor } from '@wordpress/editor';
/**
 * Internal dependencies
 */

import styles from './style.scss';
import headerToolbarStyles from '../header/header-toolbar/style.scss';
import Header from '../header';
import VisualEditor from '../visual-editor';

var Layout = /*#__PURE__*/function (_Component) {
  _inherits(Layout, _Component);

  var _super = _createSuper(Layout);

  function Layout() {
    var _this;

    _classCallCheck(this, Layout);

    _this = _super.apply(this, arguments);
    _this.onSafeAreaInsetsUpdate = _this.onSafeAreaInsetsUpdate.bind(_assertThisInitialized(_this));
    _this.onRootViewLayout = _this.onRootViewLayout.bind(_assertThisInitialized(_this));
    _this.state = {
      rootViewHeight: 0,
      safeAreaInsets: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      }
    };
    SafeArea.getSafeAreaInsetsForRootView().then(_this.onSafeAreaInsetsUpdate);
    return _this;
  }

  _createClass(Layout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      SafeArea.addEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      SafeArea.removeEventListener('safeAreaInsetsForRootViewDidChange', this.onSafeAreaInsetsUpdate);
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
      }, sendNativeEditorDidLayout);
    }
  }, {
    key: "renderHTML",
    value: function renderHTML() {
      return createElement(HTMLTextInput, {
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

      return createElement(VisualEditor, {
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

      var marginBottom = Platform.OS === 'android' && !isHtmlView ? headerToolbarStyles.container.height : 0;

      var toolbarKeyboardAvoidingViewStyle = _objectSpread({}, styles.toolbarKeyboardAvoidingView, {
        left: this.state.safeAreaInsets.left,
        right: this.state.safeAreaInsets.right,
        bottom: this.state.safeAreaInsets.bottom
      });

      return createElement(SafeAreaView, {
        style: getStylesFromColorScheme(styles.container, styles.containerDark),
        onLayout: this.onRootViewLayout
      }, createElement(AutosaveMonitor, null), createElement(View, {
        style: getStylesFromColorScheme(styles.background, styles.backgroundDark)
      }, isHtmlView ? this.renderHTML() : this.renderVisual(), !isHtmlView && Platform.OS === 'android' && createElement(FloatingToolbar, null)), createElement(View, {
        style: {
          flex: 0,
          flexBasis: marginBottom,
          height: marginBottom
        }
      }), !isHtmlView && createElement(KeyboardAvoidingView, {
        parentHeight: this.state.rootViewHeight,
        style: toolbarKeyboardAvoidingViewStyle
      }, isTemplatePickerAvailable && createElement(__experimentalPageTemplatePicker, {
        visible: isTemplatePickerVisible
      }), Platform.OS === 'ios' && createElement(FloatingToolbar, null), createElement(Header, null), createElement(BottomSheetSettings, null)));
    }
  }]);

  return Layout;
}(Component);

export default compose([withSelect(function (select) {
  var _select = select('core/editor'),
      isEditorReady = _select.__unstableIsEditorReady;

  var _select2 = select('core/edit-post'),
      getEditorMode = _select2.getEditorMode;

  return {
    isReady: isEditorReady(),
    mode: getEditorMode()
  };
}), withPreferredColorScheme, __experimentalWithPageTemplatePicker])(Layout);
//# sourceMappingURL=index.native.js.map