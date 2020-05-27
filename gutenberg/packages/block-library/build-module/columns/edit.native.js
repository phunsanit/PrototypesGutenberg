import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { View } from 'react-native';
import { dropRight, times } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl } from '@wordpress/components';
import { InspectorControls, InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar } from '@wordpress/block-editor';
import { withDispatch, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { useResizeObserver } from '@wordpress/compose';
import { createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import styles from './editor.scss';
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

  var _useResizeObserver = useResizeObserver(),
      _useResizeObserver2 = _slicedToArray(_useResizeObserver, 2),
      resizeListener = _useResizeObserver2[0],
      sizes = _useResizeObserver2[1];

  var _useState = useState(MIN_COLUMNS_NUMBER),
      _useState2 = _slicedToArray(_useState, 2),
      columnsInRow = _useState2[0],
      setColumnsInRow = _useState2[1];

  var containerMaxWidth = styles.columnsContainer.maxWidth;
  var verticalAlignment = attributes.verticalAlignment;

  var _ref2 = sizes || {},
      width = _ref2.width;

  useEffect(function () {
    var newColumnCount = !columnCount ? DEFAULT_COLUMNS : columnCount;
    updateColumns(columnCount, newColumnCount);
    setColumnsInRow(getColumnsInRow(width, newColumnCount));
  }, [columnCount]);
  useEffect(function () {
    setColumnsInRow(getColumnsInRow(width, columnCount));
  }, [width]);

  var getColumnWidth = function getColumnWidth() {
    var containerWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : containerMaxWidth;
    var minWidth = Math.min(containerWidth, containerMaxWidth);
    var columnBaseWidth = minWidth / columnsInRow;
    var columnWidth = columnBaseWidth;

    if (columnsInRow > 1) {
      var margins = columnsInRow * 2 * styles.columnMargin.marginLeft;
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
      return createElement(InnerBlocks.ButtonBlockAppender, {
        onAddBlock: onAddNextColumn
      });
    }

    return null;
  };

  return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Columns Settings')
  }, createElement(RangeControl, {
    label: __('Number of columns'),
    icon: "columns",
    value: columnCount,
    onChange: function onChange(value) {
      return updateColumns(columnCount, value);
    },
    min: MIN_COLUMNS_NUMBER,
    max: columnCount + 1,
    type: "stepper"
  }))), createElement(BlockControls, null, createElement(BlockVerticalAlignmentToolbar, {
    onChange: updateAlignment,
    value: verticalAlignment
  })), createElement(View, {
    style: isSelected && styles.innerBlocksSelected
  }, resizeListener, createElement(InnerBlocks, {
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

var ColumnsEditContainerWrapper = withDispatch(function (dispatch, ownProps, registry) {
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

        innerBlocks = [].concat(_toConsumableArray(innerBlocks), _toConsumableArray(times(newColumns - previousColumns, function () {
          return createBlock('core/column', {
            verticalAlignment: verticalAlignment
          });
        })));
      } else {
        // The removed column will be the last of the inner blocks.
        innerBlocks = dropRight(innerBlocks, previousColumns - newColumns);
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
      var insertedBlock = createBlock('core/column', {
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

  var _useSelect = useSelect(function (select) {
    var _select = select('core/block-editor'),
        getBlockCount = _select.getBlockCount;

    return {
      columnCount: getBlockCount(clientId)
    };
  }, [clientId]),
      columnCount = _useSelect.columnCount;

  return createElement(ColumnsEditContainerWrapper, _extends({
    columnCount: columnCount
  }, props));
};

export default ColumnsEdit;
//# sourceMappingURL=edit.native.js.map