"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
function ColumnEdit(_ref) {
  var attributes = _ref.attributes,
      setAttributes = _ref.setAttributes,
      updateAlignment = _ref.updateAlignment,
      hasChildBlocks = _ref.hasChildBlocks;
  var verticalAlignment = attributes.verticalAlignment,
      width = attributes.width;
  var classes = (0, _classnames2.default)('block-core-columns', (0, _defineProperty2.default)({}, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment));
  var hasWidth = Number.isFinite(width);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.BlockVerticalAlignmentToolbar, {
    onChange: updateAlignment,
    value: verticalAlignment
  })), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Column settings')
  }, (0, _element.createElement)(_components.RangeControl, {
    label: (0, _i18n.__)('Percentage width'),
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
    placeholder: width === undefined ? (0, _i18n.__)('Auto') : undefined
  }))), (0, _element.createElement)(_blockEditor.InnerBlocks, {
    templateLock: false,
    renderAppender: hasChildBlocks ? undefined : function () {
      return (0, _element.createElement)(_blockEditor.InnerBlocks.ButtonBlockAppender, null);
    },
    __experimentalTagName: _blockEditor.__experimentalBlock.div,
    __experimentalPassedProps: {
      className: classes,
      style: hasWidth ? {
        flexBasis: width + '%'
      } : undefined
    }
  }));
}

var _default = (0, _compose.compose)((0, _data.withSelect)(function (select, ownProps) {
  var clientId = ownProps.clientId;

  var _select = select('core/block-editor'),
      getBlockOrder = _select.getBlockOrder;

  return {
    hasChildBlocks: getBlockOrder(clientId).length > 0
  };
}), (0, _data.withDispatch)(function (dispatch, ownProps, registry) {
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

exports.default = _default;
//# sourceMappingURL=edit.js.map