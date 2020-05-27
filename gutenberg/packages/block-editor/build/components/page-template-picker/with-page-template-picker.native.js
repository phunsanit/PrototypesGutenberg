"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _compose = require("@wordpress/compose");

var _usePageTemplatePicker = require("./use-page-template-picker");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
var __experimentalWithPageTemplatePicker = (0, _compose.createHigherOrderComponent)(function (WrappedComponent) {
  return function (props) {
    var isTemplatePickerVisible = (0, _usePageTemplatePicker.__experimentalUsePageTemplatePickerVisible)();
    var isTemplatePickerAvailable = (0, _usePageTemplatePicker.__experimentalUsePageTemplatePickerAvailable)();
    return (0, _element.createElement)(WrappedComponent, (0, _extends2.default)({}, props, {
      isTemplatePickerVisible: isTemplatePickerVisible,
      isTemplatePickerAvailable: isTemplatePickerAvailable
    }));
  };
}, '__experimentalWithPageTemplatePicker');

var _default = __experimentalWithPageTemplatePicker;
exports.default = _default;
//# sourceMappingURL=with-page-template-picker.native.js.map