"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockListItem = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNative = require("react-native");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _block = _interopRequireDefault(require("./block"));

var _insertionPoint = _interopRequireDefault(require("./insertion-point"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var stretchStyle = {
  flex: 1
};

var BlockListItem = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(BlockListItem, _Component);

  var _super = _createSuper(BlockListItem);

  function BlockListItem() {
    (0, _classCallCheck2.default)(this, BlockListItem);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(BlockListItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          clientId = _this$props.clientId,
          isReadOnly = _this$props.isReadOnly,
          shouldShowInsertionPointBefore = _this$props.shouldShowInsertionPointBefore,
          shouldShowInsertionPointAfter = _this$props.shouldShowInsertionPointAfter,
          contentResizeMode = _this$props.contentResizeMode,
          shouldShowInnerBlockAppender = _this$props.shouldShowInnerBlockAppender,
          restProps = (0, _objectWithoutProperties2.default)(_this$props, ["clientId", "isReadOnly", "shouldShowInsertionPointBefore", "shouldShowInsertionPointAfter", "contentResizeMode", "shouldShowInnerBlockAppender"]);
      var readableContentViewStyle = contentResizeMode === 'stretch' && stretchStyle;
      return (0, _element.createElement)(_components.ReadableContentView, {
        style: readableContentViewStyle
      }, (0, _element.createElement)(_reactNative.View, {
        style: readableContentViewStyle,
        pointerEvents: isReadOnly ? 'box-only' : 'auto'
      }, shouldShowInsertionPointBefore && (0, _element.createElement)(_insertionPoint.default, null), (0, _element.createElement)(_block.default, (0, _extends2.default)({
        key: clientId,
        showTitle: false,
        clientId: clientId
      }, restProps)), !shouldShowInnerBlockAppender() && shouldShowInsertionPointAfter && (0, _element.createElement)(_insertionPoint.default, null)));
    }
  }]);
  return BlockListItem;
}(_element.Component);

exports.BlockListItem = BlockListItem;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, _ref) {
  var rootClientId = _ref.rootClientId,
      isStackedHorizontally = _ref.isStackedHorizontally,
      clientId = _ref.clientId;

  var _select = select('core/block-editor'),
      getBlockOrder = _select.getBlockOrder,
      getBlockInsertionPoint = _select.getBlockInsertionPoint,
      isBlockInsertionPointVisible = _select.isBlockInsertionPointVisible,
      getSettings = _select.getSettings;

  var blockClientIds = getBlockOrder(rootClientId);
  var insertionPoint = getBlockInsertionPoint();
  var blockInsertionPointIsVisible = isBlockInsertionPointVisible();
  var shouldShowInsertionPointBefore = !isStackedHorizontally && blockInsertionPointIsVisible && insertionPoint.rootClientId === rootClientId && ( // if list is empty, show the insertion point (via the default appender)
  blockClientIds.length === 0 || // or if the insertion point is right before the denoted block
  blockClientIds[insertionPoint.index] === clientId);
  var shouldShowInsertionPointAfter = !isStackedHorizontally && blockInsertionPointIsVisible && insertionPoint.rootClientId === rootClientId && // if the insertion point is at the end of the list
  blockClientIds.length === insertionPoint.index && // and the denoted block is the last one on the list, show the indicator at the end of the block
  blockClientIds[insertionPoint.index - 1] === clientId;
  var isReadOnly = getSettings().readOnly;
  return {
    shouldShowInsertionPointBefore: shouldShowInsertionPointBefore,
    shouldShowInsertionPointAfter: shouldShowInsertionPointAfter,
    isReadOnly: isReadOnly
  };
})])(BlockListItem);

exports.default = _default;
//# sourceMappingURL=block-list-item.native.js.map