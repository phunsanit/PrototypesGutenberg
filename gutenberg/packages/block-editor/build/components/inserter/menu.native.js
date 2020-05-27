"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.InserterMenu = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNative = require("react-native");

var _blocks = require("@wordpress/blocks");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _components = require("@wordpress/components");

var _style = _interopRequireDefault(require("./style.scss"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MIN_COL_NUM = 3;

var InserterMenu = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(InserterMenu, _Component);

  var _super = _createSuper(InserterMenu);

  function InserterMenu() {
    var _this;

    (0, _classCallCheck2.default)(this, InserterMenu);
    _this = _super.apply(this, arguments);
    _this.onClose = _this.onClose.bind((0, _assertThisInitialized2.default)(_this));
    _this.onLayout = _this.onLayout.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      numberOfColumns: MIN_COL_NUM
    };

    _reactNative.Dimensions.addEventListener('change', _this.onLayout);

    return _this;
  }

  (0, _createClass2.default)(InserterMenu, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.showInsertionPoint();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.props.hideInsertionPoint();

      _reactNative.Dimensions.removeEventListener('change', this.onLayout);
    }
  }, {
    key: "calculateMinItemWidth",
    value: function calculateMinItemWidth(bottomSheetWidth) {
      var _styles$columnPadding = _style.default.columnPadding,
          paddingLeft = _styles$columnPadding.paddingLeft,
          paddingRight = _styles$columnPadding.paddingRight;
      return (bottomSheetWidth - 2 * (paddingLeft + paddingRight)) / MIN_COL_NUM;
    }
  }, {
    key: "calculateItemWidth",
    value: function calculateItemWidth() {
      var _styles$modalItem = _style.default.modalItem,
          itemPaddingLeft = _styles$modalItem.paddingLeft,
          itemPaddingRight = _styles$modalItem.paddingRight;
      var itemWidth = _style.default.modalIconWrapper.width;
      return itemWidth + itemPaddingLeft + itemPaddingRight;
    }
  }, {
    key: "calculateColumnsProperties",
    value: function calculateColumnsProperties() {
      var bottomSheetWidth = _components.BottomSheet.getWidth();

      var _styles$columnPadding2 = _style.default.columnPadding,
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
      var bottomPadding = _style.default.contentBottomPadding;
      var modalIconWrapperStyle = getStylesFromColorScheme(_style.default.modalIconWrapper, _style.default.modalIconWrapperDark);
      var modalIconStyle = getStylesFromColorScheme(_style.default.modalIcon, _style.default.modalIconDark);
      var modalItemLabelStyle = getStylesFromColorScheme(_style.default.modalItemLabel, _style.default.modalItemLabelDark);
      var columnProperties = this.calculateColumnsProperties();
      return (0, _element.createElement)(_components.BottomSheet, {
        isVisible: true,
        onClose: this.onClose,
        contentStyle: [_style.default.content, bottomPadding],
        hideHeader: true
      }, (0, _element.createElement)(_reactNative.TouchableHighlight, {
        accessible: false
      }, (0, _element.createElement)(_reactNative.FlatList, {
        onLayout: this.onLayout,
        scrollEnabled: false,
        key: "InserterUI-".concat(numberOfColumns) //re-render when numberOfColumns changes
        ,
        keyboardShouldPersistTaps: "always",
        numColumns: numberOfColumns,
        data: items,
        ItemSeparatorComponent: function ItemSeparatorComponent() {
          return (0, _element.createElement)(_reactNative.View, {
            style: _style.default.rowSeparator
          });
        },
        keyExtractor: function keyExtractor(item) {
          return item.name;
        },
        renderItem: function renderItem(_ref) {
          var item = _ref.item;
          return (0, _element.createElement)(_reactNative.TouchableHighlight, {
            style: _style.default.touchableArea,
            underlayColor: "transparent",
            activeOpacity: 0.5,
            accessibilityLabel: item.title,
            onPress: function onPress() {
              return onSelect(item);
            }
          }, (0, _element.createElement)(_reactNative.View, {
            style: [_style.default.modalItem, {
              width: columnProperties.maxWidth
            }]
          }, (0, _element.createElement)(_reactNative.View, {
            style: [modalIconWrapperStyle, columnProperties.itemWidth && {
              width: columnProperties.itemWidth
            }]
          }, (0, _element.createElement)(_reactNative.View, {
            style: modalIconStyle
          }, (0, _element.createElement)(_components.Icon, {
            icon: item.icon.src,
            fill: modalIconStyle.fill,
            size: modalIconStyle.width
          }))), (0, _element.createElement)(_reactNative.Text, {
            style: modalItemLabelStyle
          }, item.title)));
        }
      })));
    }
  }]);
  return InserterMenu;
}(_element.Component);

exports.InserterMenu = InserterMenu;

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, _ref2) {
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
}), (0, _data.withDispatch)(function (dispatch, ownProps, _ref3) {
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
      var insertedBlock = (0, _blocks.createBlock)(name, initialAttributes);
      insertBlock(insertedBlock, ownProps.insertionIndex, ownProps.destinationRootClientId);
      ownProps.onSelect();
    },
    insertDefaultBlock: function insertDefaultBlock() {
      _insertDefaultBlock({}, ownProps.destinationRootClientId, ownProps.insertionIndex);
    }
  };
}), _compose.withInstanceId, _compose.withPreferredColorScheme)(InserterMenu);

exports.default = _default;
//# sourceMappingURL=menu.native.js.map