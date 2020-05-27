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
import { isEmpty, noop } from 'lodash';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Button, ButtonGroup, SelectControl, TextControl } from '@wordpress/components';
import { Component } from '@wordpress/element';

var ImageSizeControl = /*#__PURE__*/function (_Component) {
  _inherits(ImageSizeControl, _Component);

  var _super = _createSuper(ImageSizeControl);

  /**
   * Run additional operations during component initialization.
   *
   * @param {Object} props
   */
  function ImageSizeControl(props) {
    var _this;

    _classCallCheck(this, ImageSizeControl);

    _this = _super.call(this, props);
    _this.updateDimensions = _this.updateDimensions.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ImageSizeControl, [{
    key: "updateDimensions",
    value: function updateDimensions() {
      var _this2 = this;

      var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      return function () {
        _this2.props.onChange({
          width: width,
          height: height
        });
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props = this.props,
          imageWidth = _this$props.imageWidth,
          imageHeight = _this$props.imageHeight,
          _this$props$imageSize = _this$props.imageSizeOptions,
          imageSizeOptions = _this$props$imageSize === void 0 ? [] : _this$props$imageSize,
          _this$props$isResizab = _this$props.isResizable,
          isResizable = _this$props$isResizab === void 0 ? true : _this$props$isResizab,
          slug = _this$props.slug,
          width = _this$props.width,
          height = _this$props.height,
          _onChange = _this$props.onChange,
          _this$props$onChangeI = _this$props.onChangeImage,
          onChangeImage = _this$props$onChangeI === void 0 ? noop : _this$props$onChangeI;
      return createElement(Fragment, null, !isEmpty(imageSizeOptions) && createElement(SelectControl, {
        label: __('Image size'),
        value: slug,
        options: imageSizeOptions,
        onChange: onChangeImage
      }), isResizable && createElement("div", {
        className: "block-editor-image-size-control"
      }, createElement("p", {
        className: "block-editor-image-size-control__row"
      }, __('Image dimensions')), createElement("div", {
        className: "block-editor-image-size-control__row"
      }, createElement(TextControl, {
        type: "number",
        className: "block-editor-image-size-control__width",
        label: __('Width'),
        value: width || imageWidth || '',
        min: 1,
        onChange: function onChange(value) {
          return _onChange({
            width: parseInt(value, 10)
          });
        }
      }), createElement(TextControl, {
        type: "number",
        className: "block-editor-image-size-control__height",
        label: __('Height'),
        value: height || imageHeight || '',
        min: 1,
        onChange: function onChange(value) {
          return _onChange({
            height: parseInt(value, 10)
          });
        }
      })), createElement("div", {
        className: "block-editor-image-size-control__row"
      }, createElement(ButtonGroup, {
        "aria-label": __('Image Size')
      }, [25, 50, 75, 100].map(function (scale) {
        var scaledWidth = Math.round(imageWidth * (scale / 100));
        var scaledHeight = Math.round(imageHeight * (scale / 100));
        var isCurrent = width === scaledWidth && height === scaledHeight;
        return createElement(Button, {
          key: scale,
          isSmall: true,
          isPrimary: isCurrent,
          isPressed: isCurrent,
          onClick: _this3.updateDimensions(scaledWidth, scaledHeight)
        }, scale, "%");
      })), createElement(Button, {
        isSmall: true,
        onClick: this.updateDimensions()
      }, __('Reset')))));
    }
  }]);

  return ImageSizeControl;
}(Component);

export default ImageSizeControl;
//# sourceMappingURL=index.js.map