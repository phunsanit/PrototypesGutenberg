"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNative = require("react-native");

require("@wordpress/interface");

var _headerToolbar = _interopRequireDefault(require("./header-toolbar"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Header = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Header, _Component);

  var _super = _createSuper(Header);

  function Header() {
    var _this;

    (0, _classCallCheck2.default)(this, Header);
    _this = _super.apply(this, arguments);
    _this.keyboardDidShow = _this.keyboardDidShow.bind((0, _assertThisInitialized2.default)(_this));
    _this.keyboardDidHide = _this.keyboardDidHide.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      isKeyboardVisible: false
    };
    return _this;
  }

  (0, _createClass2.default)(Header, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _reactNative.Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);

      _reactNative.Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _reactNative.Keyboard.removeListener('keyboardDidShow', this.keyboardDidShow);

      _reactNative.Keyboard.removeListener('keyboardDidHide', this.keyboardDidHide);
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
      return (0, _element.createElement)(_headerToolbar.default, {
        showKeyboardHideButton: this.state.isKeyboardVisible
      });
    }
  }]);
  return Header;
}(_element.Component);

exports.default = Header;
//# sourceMappingURL=index.native.js.map