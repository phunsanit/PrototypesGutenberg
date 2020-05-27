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
import { FlatList, View, Text, TouchableHighlight, Dimensions } from 'react-native';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { withDispatch, withSelect } from '@wordpress/data';
import { withInstanceId, compose, withPreferredColorScheme } from '@wordpress/compose';
import { BottomSheet, Icon } from '@wordpress/components';
/**
 * Internal dependencies
 */

import styles from './style.scss';
var MIN_COL_NUM = 3;
export var InserterMenu = /*#__PURE__*/function (_Component) {
  _inherits(InserterMenu, _Component);

  var _super = _createSuper(InserterMenu);

  function InserterMenu() {
    var _this;

    _classCallCheck(this, InserterMenu);

    _this = _super.apply(this, arguments);
    _this.onClose = _this.onClose.bind(_assertThisInitialized(_this));
    _this.onLayout = _this.onLayout.bind(_assertThisInitialized(_this));
    _this.state = {
      numberOfColumns: MIN_COL_NUM
    };
    Dimensions.addEventListener('change', _this.onLayout);
    return _this;
  }

  _createClass(InserterMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.showInsertionPoint();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.hideInsertionPoint();
      Dimensions.removeEventListener('change', this.onLayout);
    }
  }, {
    key: "calculateMinItemWidth",
    value: function calculateMinItemWidth(bottomSheetWidth) {
      var _styles$columnPadding = styles.columnPadding,
          paddingLeft = _styles$columnPadding.paddingLeft,
          paddingRight = _styles$columnPadding.paddingRight;
      return (bottomSheetWidth - 2 * (paddingLeft + paddingRight)) / MIN_COL_NUM;
    }
  }, {
    key: "calculateItemWidth",
    value: function calculateItemWidth() {
      var _styles$modalItem = styles.modalItem,
          itemPaddingLeft = _styles$modalItem.paddingLeft,
          itemPaddingRight = _styles$modalItem.paddingRight;
      var itemWidth = styles.modalIconWrapper.width;
      return itemWidth + itemPaddingLeft + itemPaddingRight;
    }
  }, {
    key: "calculateColumnsProperties",
    value: function calculateColumnsProperties() {
      var bottomSheetWidth = BottomSheet.getWidth();
      var _styles$columnPadding2 = styles.columnPadding,
          paddingLeft = _styles$columnPadding2.paddingLeft,
          paddingRight = _styles$columnPadding2.paddingRight;
      var itemTotalWidth = this.calculateItemWidth();
      var containerTotalWidth = bottomSheetWidth - (paddingLeft + paddingRight);
      var numofColumns = Math.floor(containerTotalWidth / itemTotalWidth);

      if (numofColumns < MIN_COL_NUM) {
        return {
          numOfColumns: MIN_COL_NUM,
          itemWidth: this.calculateMinItemWidth(bottomSheetWidth),
          maxWidth: containerTotalWidth / MIN_COL_NUM
        };
      }

      return {
        numOfColumns: numofColumns,
        maxWidth: containerTotalWidth / numofColumns
      };
    }
  }, {
    key: "onClose",
    value: function onClose() {
      // if should replace but didn't insert any block
      // re-insert default block
      if (this.props.shouldReplaceBlock) {
        this.props.insertDefaultBlock();
      }

      this.props.onDismiss();
    }
  }, {
    key: "onLayout",
    value: function onLayout() {
      var columnProperties = this.calculateColumnsProperties();
      var numberOfColumns = columnProperties.numOfColumns;
      this.setState({
        numberOfColumns: numberOfColumns
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          getStylesFromColorScheme = _this$props.getStylesFromColorScheme,
          items = _this$props.items,
          onSelect = _this$props.onSelect;
      var numberOfColumns = this.state.numberOfColumns;
      var bottomPadding = styles.contentBottomPadding;
      var modalIconWrapperStyle = getStylesFromColorScheme(styles.modalIconWrapper, styles.modalIconWrapperDark);
      var modalIconStyle = getStylesFromColorScheme(styles.modalIcon, styles.modalIconDark);
      var modalItemLabelStyle = getStylesFromColorScheme(styles.modalItemLabel, styles.modalItemLabelDark);
      var columnProperties = this.calculateColumnsProperties();
      return createElement(BottomSheet, {
        isVisible: true,
        onClose: this.onClose,
        contentStyle: [styles.content, bottomPadding],
        hideHeader: true
      }, createElement(TouchableHighlight, {
        accessible: false
      }, createElement(FlatList, {
        onLayout: this.onLayout,
        scrollEnabled: false,
        key: "InserterUI-".concat(numberOfColumns) //re-render when numberOfColumns changes
        ,
        keyboardShouldPersistTaps: "always",
        numColumns: numberOfColumns,
        data: items,
        ItemSeparatorComponent: function ItemSeparatorComponent() {
          return createElement(View, {
            style: styles.rowSeparator
          });
        },
        keyExtractor: function keyExtractor(item) {
          return item.name;
        },
        renderItem: function renderItem(_ref) {
          var item = _ref.item;
          return createElement(TouchableHighlight, {
            style: styles.touchableArea,
            underlayColor: "transparent",
            activeOpacity: 0.5,
            accessibilityLabel: item.title,
            onPress: function onPress() {
              return onSelect(item);
            }
          }, createElement(View, {
            style: [styles.modalItem, {
              width: columnProperties.maxWidth
            }]
          }, createElement(View, {
            style: [modalIconWrapperStyle, columnProperties.itemWidth && {
              width: columnProperties.itemWidth
            }]
          }, createElement(View, {
            style: modalIconStyle
          }, createElement(Icon, {
            icon: item.icon.src,
            fill: modalIconStyle.fill,
            size: modalIconStyle.width
          }))), createElement(Text, {
            style: modalItemLabelStyle
          }, item.title)));
        }
      })));
    }
  }]);

  return InserterMenu;
}(Component);
export default compose(withSelect(function (select, _ref2) {
  var clientId = _ref2.clientId,
      isAppender = _ref2.isAppender,
      rootClientId = _ref2.rootClientId;

  var _select = select('core/block-editor'),
      getInserterItems = _select.getInserterItems,
      getBlockName = _select.getBlockName,
      getBlockRootClientId = _select.getBlockRootClientId,
      getBlockSelectionEnd = _select.getBlockSelectionEnd,
      getSettings = _select.getSettings;

  var _select2 = select('core/blocks'),
      getChildBlockNames = _select2.getChildBlockNames;

  var destinationRootClientId = rootClientId;

  if (!destinationRootClientId && !clientId && !isAppender) {
    var end = getBlockSelectionEnd();

    if (end) {
      destinationRootClientId = getBlockRootClientId(end) || undefined;
    }
  }

  var destinationRootBlockName = getBlockName(destinationRootClientId);

  var _getSettings = getSettings(),
      shouldInsertAtTheTop = _getSettings.__experimentalShouldInsertAtTheTop;

  return {
    rootChildBlocks: getChildBlockNames(destinationRootBlockName),
    items: getInserterItems(destinationRootClientId),
    destinationRootClientId: destinationRootClientId,
    shouldInsertAtTheTop: shouldInsertAtTheTop
  };
}), withDispatch(function (dispatch, ownProps, _ref3) {
  var select = _ref3.select;

  var _dispatch = dispatch('core/block-editor'),
      _showInsertionPoint = _dispatch.showInsertionPoint,
      hideInsertionPoint = _dispatch.hideInsertionPoint,
      removeBlock = _dispatch.removeBlock,
      resetBlocks = _dispatch.resetBlocks,
      clearSelectedBlock = _dispatch.clearSelectedBlock,
      insertBlock = _dispatch.insertBlock,
      _insertDefaultBlock = _dispatch.insertDefaultBlock;

  return {
    showInsertionPoint: function showInsertionPoint() {
      if (ownProps.shouldReplaceBlock) {
        var _select3 = select('core/block-editor'),
            getBlockOrder = _select3.getBlockOrder,
            getBlockCount = _select3.getBlockCount;

        var count = getBlockCount(); // Check if there is a rootClientId because that means it is a nested replacable block and we don't want to clear/reset all blocks.

        if (count === 1 && !ownProps.rootClientId) {
          // removing the last block is not possible with `removeBlock` action
          // it always inserts a default block if the last of the blocks have been removed
          clearSelectedBlock();
          resetBlocks([]);
        } else {
          var blockToReplace = getBlockOrder(ownProps.destinationRootClientId)[ownProps.insertionIndex];
          removeBlock(blockToReplace, false);
        }
      }

      _showInsertionPoint(ownProps.destinationRootClientId, ownProps.insertionIndex);
    },
    hideInsertionPoint: hideInsertionPoint,
    onSelect: function onSelect(item) {
      var name = item.name,
          initialAttributes = item.initialAttributes;
      var insertedBlock = createBlock(name, initialAttributes);
      insertBlock(insertedBlock, ownProps.insertionIndex, ownProps.destinationRootClientId);
      ownProps.onSelect();
    },
    insertDefaultBlock: function insertDefaultBlock() {
      _insertDefaultBlock({}, ownProps.destinationRootClientId, ownProps.insertionIndex);
    }
  };
}), withInstanceId, withPreferredColorScheme)(InserterMenu);
//# sourceMappingURL=menu.native.js.map