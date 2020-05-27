import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { View } from 'react-native';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { ReadableContentView } from '@wordpress/components';
/**
 * Internal dependencies
 */

import BlockListBlock from './block';
import BlockInsertionPoint from './insertion-point';
var stretchStyle = {
  flex: 1
};
export var BlockListItem = /*#__PURE__*/function (_Component) {
  _inherits(BlockListItem, _Component);

  var _super = _createSuper(BlockListItem);

  function BlockListItem() {
    _classCallCheck(this, BlockListItem);

    return _super.apply(this, arguments);
  }

  _createClass(BlockListItem, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          clientId = _this$props.clientId,
          isReadOnly = _this$props.isReadOnly,
          shouldShowInsertionPointBefore = _this$props.shouldShowInsertionPointBefore,
          shouldShowInsertionPointAfter = _this$props.shouldShowInsertionPointAfter,
          contentResizeMode = _this$props.contentResizeMode,
          shouldShowInnerBlockAppender = _this$props.shouldShowInnerBlockAppender,
          restProps = _objectWithoutProperties(_this$props, ["clientId", "isReadOnly", "shouldShowInsertionPointBefore", "shouldShowInsertionPointAfter", "contentResizeMode", "shouldShowInnerBlockAppender"]);

      var readableContentViewStyle = contentResizeMode === 'stretch' && stretchStyle;
      return createElement(ReadableContentView, {
        style: readableContentViewStyle
      }, createElement(View, {
        style: readableContentViewStyle,
        pointerEvents: isReadOnly ? 'box-only' : 'auto'
      }, shouldShowInsertionPointBefore && createElement(BlockInsertionPoint, null), createElement(BlockListBlock, _extends({
        key: clientId,
        showTitle: false,
        clientId: clientId
      }, restProps)), !shouldShowInnerBlockAppender() && shouldShowInsertionPointAfter && createElement(BlockInsertionPoint, null)));
    }
  }]);

  return BlockListItem;
}(Component);
export default compose([withSelect(function (select, _ref) {
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
//# sourceMappingURL=block-list-item.native.js.map