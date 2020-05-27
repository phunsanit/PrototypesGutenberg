import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { InnerBlocks, BlockControls, BlockVerticalAlignmentToolbar, InspectorControls, __experimentalBlock as Block } from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';
import { withDispatch, withSelect } from '@wordpress/data';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

function ColumnEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      updateAlignment = _ref.updateAlignment,
      hasChildBlocks = _ref.hasChildBlocks;
  var verticalAlignment = attributes.verticalAlignment,
      width = attributes.width;
  var classes = classnames('block-core-columns', _defineProperty({}, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment));
  var hasWidth = Number.isFinite(width);
  return createElement(Fragment, null, createElement(BlockControls, null, createElement(BlockVerticalAlignmentToolbar, {
    onChange: updateAlignment,
    value: verticalAlignment
  })), createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Column settings')
  }, createElement(RangeControl, {
    label: __('Percentage width'),
    value: width || '',
    onChange: function onChange(nextWidth) {
      setAttributes({
        width: nextWidth
      });
    },
    min: 0,
    max: 100,
    step: 0.1,
    required: true,
    allowReset: true,
    placeholder: width === undefined ? __('Auto') : undefined
  }))), createElement(InnerBlocks, {
    templateLock: false,
    renderAppender: hasChildBlocks ? undefined : function () {
      return createElement(InnerBlocks.ButtonBlockAppender, null);
    },
    __experimentalTagName: Block.div,
    __experimentalPassedProps: {
      className: classes,
      style: hasWidth ? {
        flexBasis: width + '%'
      } : undefined
    }
  }));
}

export default compose(withSelect(function (select, ownProps) {
  var clientId = ownProps.clientId;

  var _select = select('core/block-editor'),
      getBlockOrder = _select.getBlockOrder;

  return {
    hasChildBlocks: getBlockOrder(clientId).length > 0
  };
}), withDispatch(function (dispatch, ownProps, registry) {
  return {
    updateAlignment: function updateAlignment(verticalAlignment) {
      var clientId = ownProps.clientId,
          setAttributes = ownProps.setAttributes;

      var _dispatch = dispatch('core/block-editor'),
          updateBlockAttributes = _dispatch.updateBlockAttributes;

      var _registry$select = registry.select('core/block-editor'),
          getBlockRootClientId = _registry$select.getBlockRootClientId; // Update own alignment.


      setAttributes({
        verticalAlignment: verticalAlignment
      }); // Reset Parent Columns Block

      var rootClientId = getBlockRootClientId(clientId);
      updateBlockAttributes(rootClientId, {
        verticalAlignment: null
      });
    }
  };
}))(ColumnEdit);
//# sourceMappingURL=edit.js.map