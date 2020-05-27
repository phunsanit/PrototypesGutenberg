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

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _compose = require("@wordpress/compose");

var _formToggle = _interopRequireDefault(require("../form-toggle"));

var _baseControl = _interopRequireDefault(require("../base-control"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ToggleControl = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ToggleControl, _Component);

  var _super = _createSuper(ToggleControl);

  function ToggleControl() {
    var _this;

    (0, _classCallCheck2.default)(this, ToggleControl);
    _this = _super.apply(this, arguments);
    _this.onChange = _this.onChange.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ToggleControl, [{
    key: "onChange",
    value: function onChange(event) {
      if (this.props.onChange) {
        this.props.onChange(event.target.checked);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          label = _this$props.label,
          checked = _this$props.checked,
          help = _this$props.help,
          instanceId = _this$props.instanceId,
          className = _this$props.className;
      var id = "inspector-toggle-control-".concat(instanceId);
      var describedBy, helpLabel;

      if (help) {
        describedBy = id + '__help';
        helpLabel = (0, _lodash.isFunction)(help) ? help(checked) : help;
      }

      return (0, _element.createElement)(_baseControl.default, {
        id: id,
        help: helpLabel,
        className: (0, _classnames.default)('components-toggle-control', className)
      }, (0, _element.createElement)(_formToggle.default, {
        id: id,
        checked: checked,
        onChange: this.onChange,
        "aria-describedby": describedBy
      }), (0, _element.createElement)("label", {
        htmlFor: id,
        className: "components-toggle-control__label"
      }, label));
    }
  }]);
  return ToggleControl;
}(_element.Component);

var _default = (0, _compose.withInstanceId)(ToggleControl);

exports.default = _default;
//# sourceMappingURL=index.js.map