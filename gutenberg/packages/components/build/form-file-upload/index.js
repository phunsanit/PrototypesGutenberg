"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _button = _interopRequireDefault(require("../button"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var FormFileUpload = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(FormFileUpload, _Component);

  var _super = _createSuper(FormFileUpload);

  function FormFileUpload() {
    var _this;

    (0, _classCallCheck2.default)(this, FormFileUpload);
    _this = _super.apply(this, arguments);
    _this.openFileDialog = _this.openFileDialog.bind((0, _assertThisInitialized2.default)(_this));
    _this.bindInput = _this.bindInput.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(FormFileUpload, [{
    key: "openFileDialog",
    value: function openFileDialog() {
      this.input.click();
    }
  }, {
    key: "bindInput",
    value: function bindInput(ref) {
      this.input = ref;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          accept = _this$props.accept,
          children = _this$props.children,
          _this$props$multiple = _this$props.multiple,
          multiple = _this$props$multiple === void 0 ? false : _this$props$multiple,
          onChange = _this$props.onChange,
          render = _this$props.render,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["accept", "children", "multiple", "onChange", "render"]);
      var ui = render ? render({
        openFileDialog: this.openFileDialog
      }) : (0, _element.createElement)(_button.default, (0, _extends2.default)({
        onClick: this.openFileDialog
      }, props), children);
      return (0, _element.createElement)("div", {
        className: "components-form-file-upload"
      }, ui, (0, _element.createElement)("input", {
        type: "file",
        ref: this.bindInput,
        multiple: multiple,
        style: {
          display: 'none'
        },
        accept: accept,
        onChange: onChange
      }));
    }
  }]);
  return FormFileUpload;
}(_element.Component);

var _default = FormFileUpload;
exports.default = _default;
//# sourceMappingURL=index.js.map