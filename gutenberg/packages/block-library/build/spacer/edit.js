"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classnames = _interopRequireDefault(require("classnames"));

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
var MIN_SPACER_HEIGHT = 20;
var MAX_SPACER_HEIGHT = 500;

var SpacerEdit = function SpacerEdit(_ref) {
  var attributes = _ref.attributes,
      isSelected = _ref.isSelected,
      setAttributes = _ref.setAttributes,
      onResizeStart = _ref.onResizeStart,
      _onResizeStop = _ref.onResizeStop;
  var height = attributes.height;

  var updateHeight = function updateHeight(value) {
    setAttributes({
      height: value
    });
  };

  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.ResizableBox, {
    className: (0, _classnames.default)('block-library-spacer__resize-container', {
      'is-selected': isSelected
    }),
    size: {
      height: height
    },
    minHeight: MIN_SPACER_HEIGHT,
    enable: {
      top: false,
      right: false,
      bottom: true,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false
    },
    onResizeStart: onResizeStart,
    onResizeStop: function onResizeStop(event, direction, elt, delta) {
      _onResizeStop();

      var spacerHeight = Math.min(parseInt(height + delta.height, 10), MAX_SPACER_HEIGHT);
      updateHeight(spacerHeight);
    },
    showHandle: isSelected
  }), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Spacer settings')
  }, (0, _element.createElement)(_components.RangeControl, {
    label: (0, _i18n.__)('Height in pixels'),
    min: MIN_SPACER_HEIGHT,
    max: Math.max(MAX_SPACER_HEIGHT, height),
    value: height,
    onChange: updateHeight
  }))));
};

var _default = (0, _compose.compose)([(0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      toggleSelection = _dispatch.toggleSelection;

  return {
    onResizeStart: function onResizeStart() {
      return toggleSelection(false);
    },
    onResizeStop: function onResizeStop() {
      return toggleSelection(true);
    }
  };
}), _compose.withInstanceId])(SpacerEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map