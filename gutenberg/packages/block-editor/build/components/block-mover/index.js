"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockMover = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _blockDraggable = _interopRequireDefault(require("../block-draggable"));

var _button = require("./button");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var BlockMover = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(BlockMover, _Component);

  var _super = _createSuper(BlockMover);

  function BlockMover() {
    var _this;

    (0, _classCallCheck2.default)(this, BlockMover);
    _this = _super.apply(this, arguments);
    _this.state = {
      isFocused: false
    };
    _this.onFocus = _this.onFocus.bind((0, _assertThisInitialized2.default)(_this));
    _this.onBlur = _this.onBlur.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(BlockMover, [{
    key: "onFocus",
    value: function onFocus() {
      this.setState({
        isFocused: true
      });
    }
  }, {
    key: "onBlur",
    value: function onBlur() {
      this.setState({
        isFocused: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          isFirst = _this$props.isFirst,
          isLast = _this$props.isLast,
          clientIds = _this$props.clientIds,
          isLocked = _this$props.isLocked,
          isHidden = _this$props.isHidden,
          rootClientId = _this$props.rootClientId,
          hideDragHandle = _this$props.hideDragHandle,
          orientation = _this$props.__experimentalOrientation;
      var isFocused = this.state.isFocused;

      if (isLocked || isFirst && isLast && !rootClientId) {
        return null;
      } // We emulate a disabled state because forcefully applying the `disabled`
      // attribute on the buttons while it has focus causes the screen to change
      // to an unfocused state (body as active element) without firing blur on,
      // the rendering parent, leaving it unable to react to focus out.


      return (0, _element.createElement)(_blockDraggable.default, {
        clientIds: clientIds
      }, function (_ref) {
        var isDraggable = _ref.isDraggable,
            onDraggableStart = _ref.onDraggableStart,
            onDraggableEnd = _ref.onDraggableEnd;
        return (0, _element.createElement)("div", {
          className: (0, _classnames.default)('block-editor-block-mover', {
            'is-visible': isFocused || !isHidden,
            'is-horizontal': orientation === 'horizontal'
          }),
          draggable: isDraggable && !hideDragHandle,
          onDragStart: onDraggableStart,
          onDragEnd: onDraggableEnd
        }, (0, _element.createElement)(_components.ToolbarGroup, null, (0, _element.createElement)(_components.__experimentalToolbarItem, {
          onFocus: _this2.onFocus,
          onBlur: _this2.onBlur
        }, function (itemProps) {
          return (0, _element.createElement)(_button.BlockMoverUpButton, (0, _extends2.default)({
            clientIds: clientIds
          }, itemProps));
        }), (0, _element.createElement)(_components.__experimentalToolbarItem, {
          onFocus: _this2.onFocus,
          onBlur: _this2.onBlur
        }, function (itemProps) {
          return (0, _element.createElement)(_button.BlockMoverDownButton, (0, _extends2.default)({
            clientIds: clientIds
          }, itemProps));
        })));
      });
    }
  }]);
  return BlockMover;
}(_element.Component);

exports.BlockMover = BlockMover;

var _default = (0, _data.withSelect)(function (select, _ref2) {
  var clientIds = _ref2.clientIds;

  var _select = select('core/block-editor'),
      getBlock = _select.getBlock,
      getBlockIndex = _select.getBlockIndex,
      getTemplateLock = _select.getTemplateLock,
      getBlockOrder = _select.getBlockOrder,
      getBlockRootClientId = _select.getBlockRootClientId;

  var normalizedClientIds = (0, _lodash.castArray)(clientIds);
  var firstClientId = (0, _lodash.first)(normalizedClientIds);
  var block = getBlock(firstClientId);
  var rootClientId = getBlockRootClientId((0, _lodash.first)(normalizedClientIds));
  var firstIndex = getBlockIndex(firstClientId, rootClientId);
  var lastIndex = getBlockIndex((0, _lodash.last)(normalizedClientIds), rootClientId);
  var blockOrder = getBlockOrder(rootClientId);
  var isFirst = firstIndex === 0;
  var isLast = lastIndex === blockOrder.length - 1;
  return {
    blockType: block ? (0, _blocks.getBlockType)(block.name) : null,
    isLocked: getTemplateLock(rootClientId) === 'all',
    rootClientId: rootClientId,
    firstIndex: firstIndex,
    isFirst: isFirst,
    isLast: isLast
  };
})(BlockMover);

exports.default = _default;
//# sourceMappingURL=index.js.map