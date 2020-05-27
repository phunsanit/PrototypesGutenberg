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

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _linkViewer = _interopRequireDefault(require("./link-viewer"));

var _linkEditor = _interopRequireDefault(require("./link-editor"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var URLPopover = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(URLPopover, _Component);

  var _super = _createSuper(URLPopover);

  function URLPopover() {
    var _this;

    (0, _classCallCheck2.default)(this, URLPopover);
    _this = _super.apply(this, arguments);
    _this.toggleSettingsVisibility = _this.toggleSettingsVisibility.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      isSettingsExpanded: false
    };
    return _this;
  }

  (0, _createClass2.default)(URLPopover, [{
    key: "toggleSettingsVisibility",
    value: function toggleSettingsVisibility() {
      this.setState({
        isSettingsExpanded: !this.state.isSettingsExpanded
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          additionalControls = _this$props.additionalControls,
          children = _this$props.children,
          renderSettings = _this$props.renderSettings,
          _this$props$position = _this$props.position,
          position = _this$props$position === void 0 ? 'bottom center' : _this$props$position,
          _this$props$focusOnMo = _this$props.focusOnMount,
          focusOnMount = _this$props$focusOnMo === void 0 ? 'firstElement' : _this$props$focusOnMo,
          popoverProps = (0, _objectWithoutProperties2.default)(_this$props, ["additionalControls", "children", "renderSettings", "position", "focusOnMount"]);
      var isSettingsExpanded = this.state.isSettingsExpanded;
      var showSettings = !!renderSettings && isSettingsExpanded;
      return (0, _element.createElement)(_components.Popover, (0, _extends2.default)({
        className: "block-editor-url-popover",
        focusOnMount: focusOnMount,
        position: position
      }, popoverProps), (0, _element.createElement)("div", {
        className: "block-editor-url-popover__input-container"
      }, (0, _element.createElement)("div", {
        className: "block-editor-url-popover__row"
      }, children, !!renderSettings && (0, _element.createElement)(_components.Button, {
        className: "block-editor-url-popover__settings-toggle",
        icon: _icons.chevronDown,
        label: (0, _i18n.__)('Link settings'),
        onClick: this.toggleSettingsVisibility,
        "aria-expanded": isSettingsExpanded
      })), showSettings && (0, _element.createElement)("div", {
        className: "block-editor-url-popover__row block-editor-url-popover__settings"
      }, renderSettings())), additionalControls && !showSettings && (0, _element.createElement)("div", {
        className: "block-editor-url-popover__additional-controls"
      }, additionalControls));
    }
  }]);
  return URLPopover;
}(_element.Component);

URLPopover.LinkEditor = _linkEditor.default;
URLPopover.LinkViewer = _linkViewer.default;
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/url-popover/README.md
 */

var _default = URLPopover;
exports.default = _default;
//# sourceMappingURL=index.js.map