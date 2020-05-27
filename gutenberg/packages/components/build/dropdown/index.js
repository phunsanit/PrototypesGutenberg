"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classnames = _interopRequireDefault(require("classnames"));

var _popover = _interopRequireDefault(require("../popover"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var Dropdown = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Dropdown, _Component);

  var _super = _createSuper(Dropdown);

  function Dropdown() {
    var _this;

    (0, _classCallCheck2.default)(this, Dropdown);
    _this = _super.apply(this, arguments);
    _this.toggle = _this.toggle.bind((0, _assertThisInitialized2.default)(_this));
    _this.close = _this.close.bind((0, _assertThisInitialized2.default)(_this));
    _this.closeIfFocusOutside = _this.closeIfFocusOutside.bind((0, _assertThisInitialized2.default)(_this));
    _this.containerRef = (0, _element.createRef)();
    _this.state = {
      isOpen: false
    };
    return _this;
  }

  (0, _createClass2.default)(Dropdown, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var isOpen = this.state.isOpen;
      var onToggle = this.props.onToggle;

      if (isOpen && onToggle) {
        onToggle(false);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var isOpen = this.state.isOpen;
      var onToggle = this.props.onToggle;

      if (prevState.isOpen !== isOpen && onToggle) {
        onToggle(isOpen);
      }
    }
  }, {
    key: "toggle",
    value: function toggle() {
      this.setState(function (state) {
        return {
          isOpen: !state.isOpen
        };
      });
    }
    /**
     * Closes the dropdown if a focus leaves the dropdown wrapper. This is
     * intentionally distinct from `onClose` since focus loss from the popover
     * is expected to occur when using the Dropdown's toggle button, in which
     * case the correct behavior is to keep the dropdown closed. The same applies
     * in case when focus is moved to the modal dialog.
     */

  }, {
    key: "closeIfFocusOutside",
    value: function closeIfFocusOutside() {
      if (!this.containerRef.current.contains(document.activeElement) && !document.activeElement.closest('[role="dialog"]')) {
        this.close();
      }
    }
  }, {
    key: "close",
    value: function close() {
      if (this.props.onClose) {
        this.props.onClose();
      }

      this.setState({
        isOpen: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var isOpen = this.state.isOpen;
      var _this$props = this.props,
          renderContent = _this$props.renderContent,
          renderToggle = _this$props.renderToggle,
          _this$props$position = _this$props.position,
          position = _this$props$position === void 0 ? 'bottom right' : _this$props$position,
          className = _this$props.className,
          contentClassName = _this$props.contentClassName,
          expandOnMobile = _this$props.expandOnMobile,
          headerTitle = _this$props.headerTitle,
          focusOnMount = _this$props.focusOnMount,
          popoverProps = _this$props.popoverProps;
      var args = {
        isOpen: isOpen,
        onToggle: this.toggle,
        onClose: this.close
      };
      return (0, _element.createElement)("div", {
        className: (0, _classnames.default)('components-dropdown', className),
        ref: this.containerRef
      }, renderToggle(args), isOpen && (0, _element.createElement)(_popover.default, (0, _extends2.default)({
        position: position,
        onClose: this.close,
        onFocusOutside: this.closeIfFocusOutside,
        expandOnMobile: expandOnMobile,
        headerTitle: headerTitle,
        focusOnMount: focusOnMount,
        isAlternate: true
      }, popoverProps, {
        className: (0, _classnames.default)('components-dropdown__content', popoverProps ? popoverProps.className : undefined, contentClassName)
      }), renderContent(args)));
    }
  }]);
  return Dropdown;
}(_element.Component);

var _default = Dropdown;
exports.default = _default;
//# sourceMappingURL=index.js.map