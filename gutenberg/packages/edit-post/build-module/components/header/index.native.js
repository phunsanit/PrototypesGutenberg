import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { Keyboard } from 'react-native';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import '@wordpress/interface';
/**
 * Internal dependencies
 */

import HeaderToolbar from './header-toolbar';

var Header = /*#__PURE__*/function (_Component) {
  _inherits(Header, _Component);

  var _super = _createSuper(Header);

  function Header() {
    var _this;

    _classCallCheck(this, Header);

    _this = _super.apply(this, arguments);
    _this.keyboardDidShow = _this.keyboardDidShow.bind(_assertThisInitialized(_this));
    _this.keyboardDidHide = _this.keyboardDidHide.bind(_assertThisInitialized(_this));
    _this.state = {
      isKeyboardVisible: false
    };
    return _this;
  }

  _createClass(Header, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
      Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      Keyboard.removeListener('keyboardDidShow', this.keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', this.keyboardDidHide);
    }
  }, {
    key: "keyboardDidShow",
    value: function keyboardDidShow() {
      this.setState({
        isKeyboardVisible: true
      });
    }
  }, {
    key: "keyboardDidHide",
    value: function keyboardDidHide() {
      this.setState({
        isKeyboardVisible: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      return createElement(HeaderToolbar, {
        showKeyboardHideButton: this.state.isKeyboardVisible
      });
    }
  }]);

  return Header;
}(Component);

export { Header as default };
//# sourceMappingURL=index.native.js.map