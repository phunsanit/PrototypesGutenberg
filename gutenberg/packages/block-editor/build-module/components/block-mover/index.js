import _extends from "@babel/runtime/helpers/esm/extends";
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
import { first, last, castArray } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { ToolbarGroup, __experimentalToolbarItem as ToolbarItem } from '@wordpress/components';
import { getBlockType } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
/**
 * Internal dependencies
 */

import BlockDraggable from '../block-draggable';
import { BlockMoverUpButton, BlockMoverDownButton } from './button';
export var BlockMover = /*#__PURE__*/function (_Component) {
  _inherits(BlockMover, _Component);

  var _super = _createSuper(BlockMover);

  function BlockMover() {
    var _this;

    _classCallCheck(this, BlockMover);

    _this = _super.apply(this, arguments);
    _this.state = {
      isFocused: false
    };
    _this.onFocus = _this.onFocus.bind(_assertThisInitialized(_this));
    _this.onBlur = _this.onBlur.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BlockMover, [{
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


      return createElement(BlockDraggable, {
        clientIds: clientIds
      }, function (_ref) {
        var isDraggable = _ref.isDraggable,
            onDraggableStart = _ref.onDraggableStart,
            onDraggableEnd = _ref.onDraggableEnd;
        return createElement("div", {
          className: classnames('block-editor-block-mover', {
            'is-visible': isFocused || !isHidden,
            'is-horizontal': orientation === 'horizontal'
          }),
          draggable: isDraggable && !hideDragHandle,
          onDragStart: onDraggableStart,
          onDragEnd: onDraggableEnd
        }, createElement(ToolbarGroup, null, createElement(ToolbarItem, {
          onFocus: _this2.onFocus,
          onBlur: _this2.onBlur
        }, function (itemProps) {
          return createElement(BlockMoverUpButton, _extends({
            clientIds: clientIds
          }, itemProps));
        }), createElement(ToolbarItem, {
          onFocus: _this2.onFocus,
          onBlur: _this2.onBlur
        }, function (itemProps) {
          return createElement(BlockMoverDownButton, _extends({
            clientIds: clientIds
          }, itemProps));
        })));
      });
    }
  }]);

  return BlockMover;
}(Component);
export default withSelect(function (select, _ref2) {
  var clientIds = _ref2.clientIds;

  var _select = select('core/block-editor'),
      getBlock = _select.getBlock,
      getBlockIndex = _select.getBlockIndex,
      getTemplateLock = _select.getTemplateLock,
      getBlockOrder = _select.getBlockOrder,
      getBlockRootClientId = _select.getBlockRootClientId;

  var normalizedClientIds = castArray(clientIds);
  var firstClientId = first(normalizedClientIds);
  var block = getBlock(firstClientId);
  var rootClientId = getBlockRootClientId(first(normalizedClientIds));
  var firstIndex = getBlockIndex(firstClientId, rootClientId);
  var lastIndex = getBlockIndex(last(normalizedClientIds), rootClientId);
  var blockOrder = getBlockOrder(rootClientId);
  var isFirst = firstIndex === 0;
  var isLast = lastIndex === blockOrder.length - 1;
  return {
    blockType: block ? getBlockType(block.name) : null,
    isLocked: getTemplateLock(rootClientId) === 'all',
    rootClientId: rootClientId,
    firstIndex: firstIndex,
    isFirst: isFirst,
    isLast: isLast
  };
})(BlockMover);
//# sourceMappingURL=index.js.map