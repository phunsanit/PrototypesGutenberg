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

var _blockEditor = require("@wordpress/block-editor");

var _header = _interopRequireDefault(require("./header"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var VisualEditor = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(VisualEditor, _Component);

  var _super = _createSuper(VisualEditor);

  function VisualEditor(props) {
    var _this;

    (0, _classCallCheck2.default)(this, VisualEditor);
    _this = _super.call(this, props);
    _this.renderHeader = _this.renderHeader.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(VisualEditor, [{
    key: "renderHeader",
    value: function renderHeader() {
      var setTitleRef = this.props.setTitleRef;
      return (0, _element.createElement)(_header.default, {
        setTitleRef: setTitleRef
      });
    }
  }, {
    key: "render",
    value: function render() {
      var safeAreaBottomInset = this.props.safeAreaBottomInset;
      return (0, _element.createElement)(_blockEditor.BlockList, {
        header: this.renderHeader,
        safeAreaBottomInset: safeAreaBottomInset,
        autoScroll: true
      });
    }
  }]);
  return VisualEditor;
}(_element.Component);

exports.default = VisualEditor;
//# sourceMappingURL=index.native.js.map