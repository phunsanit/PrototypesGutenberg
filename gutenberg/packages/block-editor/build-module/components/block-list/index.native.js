import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { identity } from 'lodash';
import { View, Platform, TouchableWithoutFeedback } from 'react-native';
/**
 * WordPress dependencies
 */

import { Component, createContext } from '@wordpress/element';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
import { KeyboardAwareFlatList, ReadableContentView } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import styles from './style.scss';
import BlockListAppender from '../block-list-appender';
import BlockListItem from './block-list-item.native';
var BlockListContext = createContext();
var stylesMemo = {};

var getStyles = function getStyles(isRootList, isStackedHorizontally, horizontalAlignment) {
  if (isRootList) {
    return;
  }

  var styleName = "".concat(isStackedHorizontally, "-").concat(horizontalAlignment);

  if (stylesMemo[styleName]) {
    return stylesMemo[styleName];
  }

  var computedStyles = [isStackedHorizontally && styles.horizontal, horizontalAlignment && styles["is-aligned-".concat(horizontalAlignment)]];
  stylesMemo[styleName] = computedStyles;
  return computedStyles;
};

export var BlockList = /*#__PURE__*/function (_Component) {
  _inherits(BlockList, _Component);

  var _super = _createSuper(BlockList);

  function BlockList() {
    var _this;

    _classCallCheck(this, BlockList);

    _this = _super.apply(this, arguments);
    _this.renderItem = _this.renderItem.bind(_assertThisInitialized(_this));
    _this.renderBlockListFooter = _this.renderBlockListFooter.bind(_assertThisInitialized(_this));
    _this.onCaretVerticalPositionChange = _this.onCaretVerticalPositionChange.bind(_assertThisInitialized(_this));
    _this.scrollViewInnerRef = _this.scrollViewInnerRef.bind(_assertThisInitialized(_this));
    _this.addBlockToEndOfPost = _this.addBlockToEndOfPost.bind(_assertThisInitialized(_this));
    _this.shouldFlatListPreventAutomaticScroll = _this.shouldFlatListPreventAutomaticScroll.bind(_assertThisInitialized(_this));
    _this.shouldShowInnerBlockAppender = _this.shouldShowInnerBlockAppender.bind(_assertThisInitialized(_this));
    _this.renderEmptyList = _this.renderEmptyList.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BlockList, [{
    key: "addBlockToEndOfPost",
    value: function addBlockToEndOfPost(newBlock) {
      this.props.insertBlock(newBlock, this.props.blockCount);
    }
  }, {
    key: "onCaretVerticalPositionChange",
    value: function onCaretVerticalPositionChange(targetId, caretY, previousCaretY) {
      KeyboardAwareFlatList.handleCaretVerticalPositionChange(this.scrollViewRef, targetId, caretY, previousCaretY);
    }
  }, {
    key: "scrollViewInnerRef",
    value: function scrollViewInnerRef(ref) {
      this.scrollViewRef = ref;
    }
  }, {
    key: "shouldFlatListPreventAutomaticScroll",
    value: function shouldFlatListPreventAutomaticScroll() {
      return this.props.isBlockInsertionPointVisible;
    }
  }, {
    key: "shouldShowInnerBlockAppender",
    value: function shouldShowInnerBlockAppender() {
      var _this$props = this.props,
          blockClientIds = _this$props.blockClientIds,
          renderAppender = _this$props.renderAppender;
      return renderAppender && blockClientIds.length > 0;
    }
  }, {
    key: "renderEmptyList",
    value: function renderEmptyList() {
      return createElement(EmptyListComponentCompose, {
        rootClientId: this.props.rootClientId,
        renderAppender: this.props.renderAppender
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var isRootList = this.props.isRootList; // Use of Context to propagate the main scroll ref to its children e.g InnerBlocks

      return isRootList ? createElement(BlockListContext.Provider, {
        value: this.scrollViewRef
      }, this.renderList()) : createElement(BlockListContext.Consumer, null, function (ref) {
        return _this2.renderList({
          parentScrollRef: ref
        });
      });
    }
  }, {
    key: "renderList",
    value: function renderList() {
      var _this3 = this;

      var extraProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _this$props2 = this.props,
          clearSelectedBlock = _this$props2.clearSelectedBlock,
          blockClientIds = _this$props2.blockClientIds,
          title = _this$props2.title,
          header = _this$props2.header,
          isReadOnly = _this$props2.isReadOnly,
          isRootList = _this$props2.isRootList,
          horizontal = _this$props2.horizontal,
          _this$props2$marginVe = _this$props2.marginVertical,
          marginVertical = _this$props2$marginVe === void 0 ? styles.defaultBlock.marginTop : _this$props2$marginVe,
          _this$props2$marginHo = _this$props2.marginHorizontal,
          marginHorizontal = _this$props2$marginHo === void 0 ? styles.defaultBlock.marginLeft : _this$props2$marginHo,
          isFloatingToolbarVisible = _this$props2.isFloatingToolbarVisible,
          isStackedHorizontally = _this$props2.isStackedHorizontally,
          horizontalAlignment = _this$props2.horizontalAlignment,
          parentWidth = _this$props2.parentWidth;
      var parentScrollRef = extraProps.parentScrollRef;
      var blockToolbar = styles.blockToolbar,
          blockBorder = styles.blockBorder,
          headerToolbar = styles.headerToolbar,
          floatingToolbar = styles.floatingToolbar;
      var containerStyle = {
        flex: isRootList ? 1 : 0,
        // We set negative margin in the parent to remove the edge spacing between parent block and child block in ineer blocks
        marginVertical: isRootList ? 0 : -marginVertical,
        marginHorizontal: isRootList ? 0 : -marginHorizontal
      };
      return createElement(View, {
        style: containerStyle,
        onAccessibilityEscape: clearSelectedBlock
      }, createElement(KeyboardAwareFlatList, _extends({}, Platform.OS === 'android' ? {
        removeClippedSubviews: false
      } : {}, {
        // Disable clipping on Android to fix focus losing. See https://github.com/wordpress-mobile/gutenberg-mobile/pull/741#issuecomment-472746541
        accessibilityLabel: "block-list",
        autoScroll: this.props.autoScroll,
        innerRef: function innerRef(ref) {
          _this3.scrollViewInnerRef(parentScrollRef || ref);
        },
        extraScrollHeight: blockToolbar.height + blockBorder.width,
        inputAccessoryViewHeight: headerToolbar.height + (isFloatingToolbarVisible ? floatingToolbar.height : 0),
        keyboardShouldPersistTaps: "always",
        scrollViewStyle: [{
          flex: isRootList ? 1 : 0
        }, !isRootList && styles.overflowVisible],
        horizontal: horizontal,
        extraData: parentWidth,
        scrollEnabled: isRootList,
        contentContainerStyle: horizontal && styles.horizontalContentContainer,
        style: getStyles(isRootList, isStackedHorizontally, horizontalAlignment),
        data: blockClientIds,
        keyExtractor: identity,
        renderItem: this.renderItem,
        shouldPreventAutomaticScroll: this.shouldFlatListPreventAutomaticScroll,
        title: title,
        ListHeaderComponent: header,
        ListEmptyComponent: !isReadOnly && this.renderEmptyList,
        ListFooterComponent: this.renderBlockListFooter
      })), this.shouldShowInnerBlockAppender() && createElement(View, {
        style: {
          marginHorizontal: marginHorizontal - styles.innerAppender.marginLeft
        }
      }, createElement(BlockListAppender, {
        rootClientId: this.props.rootClientId,
        renderAppender: this.props.renderAppender,
        showSeparator: true
      })));
    }
  }, {
    key: "renderItem",
    value: function renderItem(_ref) {
      var clientId = _ref.item;
      var _this$props3 = this.props,
          contentResizeMode = _this$props3.contentResizeMode,
          contentStyle = _this$props3.contentStyle,
          onAddBlock = _this$props3.onAddBlock,
          onDeleteBlock = _this$props3.onDeleteBlock,
          rootClientId = _this$props3.rootClientId,
          isStackedHorizontally = _this$props3.isStackedHorizontally,
          parentWidth = _this$props3.parentWidth,
          _this$props3$marginVe = _this$props3.marginVertical,
          marginVertical = _this$props3$marginVe === void 0 ? styles.defaultBlock.marginTop : _this$props3$marginVe,
          _this$props3$marginHo = _this$props3.marginHorizontal,
          marginHorizontal = _this$props3$marginHo === void 0 ? styles.defaultBlock.marginLeft : _this$props3$marginHo;
      return createElement(BlockListItem, {
        isStackedHorizontally: isStackedHorizontally,
        rootClientId: rootClientId,
        clientId: clientId,
        parentWidth: parentWidth,
        contentResizeMode: contentResizeMode,
        contentStyle: contentStyle,
        onAddBlock: onAddBlock,
        marginVertical: marginVertical,
        marginHorizontal: marginHorizontal,
        onDeleteBlock: onDeleteBlock,
        shouldShowInnerBlockAppender: this.shouldShowInnerBlockAppender,
        onCaretVerticalPositionChange: this.onCaretVerticalPositionChange
      });
    }
  }, {
    key: "renderBlockListFooter",
    value: function renderBlockListFooter() {
      var _this4 = this;

      var paragraphBlock = createBlock('core/paragraph');
      var _this$props4 = this.props,
          isReadOnly = _this$props4.isReadOnly,
          _this$props4$withFoot = _this$props4.withFooter,
          withFooter = _this$props4$withFoot === void 0 ? true : _this$props4$withFoot,
          renderFooterAppender = _this$props4.renderFooterAppender;

      if (!isReadOnly && withFooter) {
        return createElement(Fragment, null, createElement(TouchableWithoutFeedback, {
          accessibilityLabel: __('Add paragraph block'),
          onPress: function onPress() {
            _this4.addBlockToEndOfPost(paragraphBlock);
          }
        }, createElement(View, {
          style: styles.blockListFooter
        })));
      } else if (renderFooterAppender) {
        return renderFooterAppender();
      }

      return null;
    }
  }]);

  return BlockList;
}(Component);
export default compose([withSelect(function (select, _ref2) {
  var rootClientId = _ref2.rootClientId,
      __experimentalMoverDirection = _ref2.__experimentalMoverDirection;

  var _select = select('core/block-editor'),
      getBlockCount = _select.getBlockCount,
      getBlockOrder = _select.getBlockOrder,
      getSelectedBlockClientId = _select.getSelectedBlockClientId,
      isBlockInsertionPointVisible = _select.isBlockInsertionPointVisible,
      getSettings = _select.getSettings,
      getBlockHierarchyRootClientId = _select.getBlockHierarchyRootClientId;

  var isStackedHorizontally = __experimentalMoverDirection === 'horizontal';
  var selectedBlockClientId = getSelectedBlockClientId();
  var blockClientIds = getBlockOrder(rootClientId);
  var isReadOnly = getSettings().readOnly;
  var rootBlockId = getBlockHierarchyRootClientId(selectedBlockClientId);
  var hasRootInnerBlocks = !!getBlockCount(rootBlockId);
  var isFloatingToolbarVisible = !!selectedBlockClientId && hasRootInnerBlocks;
  return {
    blockClientIds: blockClientIds,
    blockCount: getBlockCount(rootClientId),
    isBlockInsertionPointVisible: isBlockInsertionPointVisible(),
    isReadOnly: isReadOnly,
    isRootList: rootClientId === undefined,
    isFloatingToolbarVisible: isFloatingToolbarVisible,
    isStackedHorizontally: isStackedHorizontally
  };
}), withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      insertBlock = _dispatch.insertBlock,
      replaceBlock = _dispatch.replaceBlock,
      clearSelectedBlock = _dispatch.clearSelectedBlock;

  return {
    clearSelectedBlock: clearSelectedBlock,
    insertBlock: insertBlock,
    replaceBlock: replaceBlock
  };
}), withPreferredColorScheme])(BlockList);

var EmptyListComponent = /*#__PURE__*/function (_Component2) {
  _inherits(EmptyListComponent, _Component2);

  var _super2 = _createSuper(EmptyListComponent);

  function EmptyListComponent() {
    _classCallCheck(this, EmptyListComponent);

    return _super2.apply(this, arguments);
  }

  _createClass(EmptyListComponent, [{
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          shouldShowInsertionPoint = _this$props5.shouldShowInsertionPoint,
          rootClientId = _this$props5.rootClientId,
          renderAppender = _this$props5.renderAppender;
      return createElement(View, {
        style: styles.defaultAppender
      }, createElement(ReadableContentView, null, createElement(BlockListAppender, {
        rootClientId: rootClientId,
        renderAppender: renderAppender,
        showSeparator: shouldShowInsertionPoint
      })));
    }
  }]);

  return EmptyListComponent;
}(Component);

var EmptyListComponentCompose = compose([withSelect(function (select, _ref3) {
  var rootClientId = _ref3.rootClientId,
      __experimentalMoverDirection = _ref3.__experimentalMoverDirection;

  var _select2 = select('core/block-editor'),
      getBlockOrder = _select2.getBlockOrder,
      getBlockInsertionPoint = _select2.getBlockInsertionPoint,
      isBlockInsertionPointVisible = _select2.isBlockInsertionPointVisible;

  var isStackedHorizontally = __experimentalMoverDirection === 'horizontal';
  var blockClientIds = getBlockOrder(rootClientId);
  var insertionPoint = getBlockInsertionPoint();
  var blockInsertionPointIsVisible = isBlockInsertionPointVisible();
  var shouldShowInsertionPoint = !isStackedHorizontally && blockInsertionPointIsVisible && insertionPoint.rootClientId === rootClientId && ( // if list is empty, show the insertion point (via the default appender)
  blockClientIds.length === 0 || // or if the insertion point is right before the denoted block
  !blockClientIds[insertionPoint.index]);
  return {
    shouldShowInsertionPoint: shouldShowInsertionPoint
  };
})])(EmptyListComponent);
//# sourceMappingURL=index.native.js.map