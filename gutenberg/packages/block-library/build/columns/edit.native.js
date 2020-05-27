"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _reactNative = require("react-native");

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _blocks = require("@wordpress/blocks");

var _editor = _interopRequireDefault(require("./editor.scss"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
var ALLOWED_BLOCKS = ['core/column'];
/**
 * Number of columns to assume for template in case the user opts to skip
 * template option selection.
 *
 * @type {number}
 */

var DEFAULT_COLUMNS = 2;
var MIN_COLUMNS_NUMBER = 1;
var BREAKPOINTS = {
  mobile: 480,
  large: 768
};

function ColumnsEditContainer(_ref) {
  var attributes = _ref.attributes,
      updateAlignment = _ref.updateAlignment,
      updateColumns = _ref.updateColumns,
      columnCount = _ref.columnCount,
      isSelected = _ref.isSelected,
      onAddNextColumn = _ref.onAddNextColumn,
      onDeleteBlock = _ref.onDeleteBlock;

  var _useResizeObserver = (0, _compose.useResizeObserver)(),
      _useResizeObserver2 = (0, _slicedToArray2.default)(_useResizeObserver, 2),
      resizeListener = _useResizeObserver2[0],
      sizes = _useResizeObserver2[1];

  var _useState = (0, _element.useState)(MIN_COLUMNS_NUMBER),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      columnsInRow = _useState2[0],
      setColumnsInRow = _useState2[1];

  var containerMaxWidth = _editor.default.columnsContainer.maxWidth;
  var verticalAlignment = attributes.verticalAlignment;

  var _ref2 = sizes || {},
      width = _ref2.width;

  (0, _element.useEffect)(function () {
    var newColumnCount = !columnCount ? DEFAULT_COLUMNS : columnCount;
    updateColumns(columnCount, newColumnCount);
    setColumnsInRow(getColumnsInRow(width, newColumnCount));
  }, [columnCount]);
  (0, _element.useEffect)(function () {
    setColumnsInRow(getColumnsInRow(width, columnCount));
  }, [width]);

  var getColumnWidth = function getColumnWidth() {
    var containerWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : containerMaxWidth;
    var minWidth = Math.min(containerWidth, containerMaxWidth);
    var columnBaseWidth = minWidth / columnsInRow;
    var columnWidth = columnBaseWidth;

    if (columnsInRow > 1) {
      var margins = columnsInRow * 2 * _editor.default.columnMargin.marginLeft;
      columnWidth = (minWidth - margins) / columnsInRow;
    }

    return columnWidth;
  };

  var getColumnsInRow = function getColumnsInRow(containerWidth, columnsNumber) {
    if (containerWidth < BREAKPOINTS.mobile) {
      // show only 1 Column in row for mobile breakpoint container width
      return 1;
    } else if (containerWidth < BREAKPOINTS.large) {
      // show 2 Column in row for large breakpoint container width
      return Math.min(Math.max(1, columnCount), 2);
    } // show all Column in one row


    return Math.max(1, columnsNumber);
  };

  var renderAppender = function renderAppender() {
    if (isSelected) {
      return (0, _element.createElement)(_blockEditor.InnerBlocks.ButtonBlockAppender, {
        onAddBlock: onAddNextColumn
      });
    }

    return null;
  };

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Columns Settings')
  }, (0, _element.createElement)(_components.RangeControl, {
    label: (0, _i18n.__)('Number of columns'),
    icon: "columns",
    value: columnCount,
    onChange: function onChange(value) {
      return updateColumns(columnCount, value);
    },
    min: MIN_COLUMNS_NUMBER,
    max: columnCount + 1,
    type: "stepper"
  }))), (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.BlockVerticalAlignmentToolbar, {
    onChange: updateAlignment,
    value: verticalAlignment
  })), (0, _element.createElement)(_reactNative.View, {
    style: isSelected && _editor.default.innerBlocksSelected
  }, resizeListener, (0, _element.createElement)(_blockEditor.InnerBlocks, {
    renderAppender: renderAppender,
    __experimentalMoverDirection: columnsInRow > 1 ? 'horizontal' : undefined,
    horizontal: true,
    allowedBlocks: ALLOWED_BLOCKS,
    contentResizeMode: "stretch",
    onAddBlock: onAddNextColumn,
    onDeleteBlock: columnCount === 1 ? onDeleteBlock : undefined,
    contentStyle: {
      width: getColumnWidth(width)
    }
  })));
}

var ColumnsEditContainerWrapper = (0, _data.withDispatch)(function (dispatch, ownProps, registry) {
  return {
    /**
     * Update all child Column blocks with a new vertical alignment setting
     * based on whatever alignment is passed in. This allows change to parent
     * to overide anything set on a individual column basis.
     *
     * @param {string} verticalAlignment the vertical alignment setting
     */
    updateAlignment: function updateAlignment(verticalAlignment) {
      var clientId = ownProps.clientId,
          setAttributes = ownProps.setAttributes;

      var _dispatch = dispatch('core/block-editor'),
          updateBlockAttributes = _dispatch.updateBlockAttributes;

      var _registry$select = registry.select('core/block-editor'),
          getBlockOrder = _registry$select.getBlockOrder; // Update own alignment.


      setAttributes({
        verticalAlignment: verticalAlignment
      }); // Update all child Column Blocks to match

      var innerBlockClientIds = getBlockOrder(clientId);
      innerBlockClientIds.forEach(function (innerBlockClientId) {
        updateBlockAttributes(innerBlockClientId, {
          verticalAlignment: verticalAlignment
        });
      });
    },
    updateBlockSettings: function updateBlockSettings(settings) {
      var clientId = ownProps.clientId;

      var _dispatch2 = dispatch('core/block-editor'),
          updateBlockListSettings = _dispatch2.updateBlockListSettings;

      updateBlockListSettings(clientId, settings);
    },

    /**
     * Updates the column columnCount, including necessary revisions to child Column
     * blocks to grant required or redistribute available space.
     *
     * @param {number} previousColumns Previous column columnCount.
     * @param {number} newColumns      New column columnCount.
     */
    updateColumns: function updateColumns(previousColumns, newColumns) {
      var clientId = ownProps.clientId;

      var _dispatch3 = dispatch('core/block-editor'),
          replaceInnerBlocks = _dispatch3.replaceInnerBlocks;

      var _registry$select2 = registry.select('core/block-editor'),
          getBlocks = _registry$select2.getBlocks,
          getBlockAttributes = _registry$select2.getBlockAttributes;

      var innerBlocks = getBlocks(clientId); // Redistribute available width for existing inner blocks.

      var isAddingColumn = newColumns > previousColumns;

      if (isAddingColumn) {
        // Get verticalAlignment from Columns block to set the same to new Column
        var _getBlockAttributes = getBlockAttributes(clientId),
            verticalAlignment = _getBlockAttributes.verticalAlignment;

        innerBlocks = [].concat((0, _toConsumableArray2.default)(innerBlocks), (0, _toConsumableArray2.default)((0, _lodash.times)(newColumns - previousColumns, function () {
          return (0, _blocks.createBlock)('core/column', {
            verticalAlignment: verticalAlignment
          });
        })));
      } else {
        // The removed column will be the last of the inner blocks.
        innerBlocks = (0, _lodash.dropRight)(innerBlocks, previousColumns - newColumns);
      }

      replaceInnerBlocks(clientId, innerBlocks, false);
    },
    onAddNextColumn: function onAddNextColumn() {
      var clientId = ownProps.clientId;

      var _dispatch4 = dispatch('core/block-editor'),
          replaceInnerBlocks = _dispatch4.replaceInnerBlocks,
          selectBlock = _dispatch4.selectBlock;

      var _registry$select3 = registry.select('core/block-editor'),
          getBlocks = _registry$select3.getBlocks,
          getBlockAttributes = _registry$select3.getBlockAttributes; // Get verticalAlignment from Columns block to set the same to new Column


      var _getBlockAttributes2 = getBlockAttributes(clientId),
          verticalAlignment = _getBlockAttributes2.verticalAlignment;

      var innerBlocks = getBlocks(clientId);
      var insertedBlock = (0, _blocks.createBlock)('core/column', {
        verticalAlignment: verticalAlignment
      });
      innerBlocks.push(insertedBlock);
      replaceInnerBlocks(clientId, innerBlocks, true);
      selectBlock(insertedBlock.clientId);
    },
    onDeleteBlock: function onDeleteBlock() {
      var clientId = ownProps.clientId;

      var _dispatch5 = dispatch('core/block-editor'),
          removeBlock = _dispatch5.removeBlock;

      removeBlock(clientId);
    }
  };
})(ColumnsEditContainer);

var ColumnsEdit = function ColumnsEdit(props) {
  var clientId = props.clientId;

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core/block-editor'),
        getBlockCount = _select.getBlockCount;

    return {
      columnCount: getBlockCount(clientId)
    };
  }, [clientId]),
      columnCount = _useSelect.columnCount;

  return (0, _element.createElement)(ColumnsEditContainerWrapper, (0, _extends2.default)({
    columnCount: columnCount
  }, props));
};

var _default = ColumnsEdit;
exports.default = _default;
//# sourceMappingURL=edit.native.js.map