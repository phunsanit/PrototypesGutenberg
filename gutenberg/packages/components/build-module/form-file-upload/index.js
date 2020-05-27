import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
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
 * WordPress dependencies
 */
import { Component } from '@wordpress/element';
/**
 * Internal dependencies
 */

import Button from '../button';

var FormFileUpload = /*#__PURE__*/function (_Component) {
  _inherits(FormFileUpload, _Component);

  var _super = _createSuper(FormFileUpload);

  function FormFileUpload() {
    var _this;

    _classCallCheck(this, FormFileUpload);

    _this = _super.apply(this, arguments);
    _this.openFileDialog = _this.openFileDialog.bind(_assertThisInitialized(_this));
    _this.bindInput = _this.bindInput.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(FormFileUpload, [{
    key: "openFileDialog",
    value: function openFileDialog() {
      this.input.click();
    }
  }, {
    key: "bindInput",
    value: function bindInput(ref) {
      this.input = ref;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          accept = _this$props.accept,
          children = _this$props.children,
          _this$props$multiple = _this$props.multiple,
          multiple = _this$props$multiple === void 0 ? false : _this$props$multiple,
          onChange = _this$props.onChange,
          render = _this$props.render,
          props = _objectWithoutProperties(_this$props, ["accept", "children", "multiple", "onChange", "render"]);

      var ui = render ? render({
        openFileDialog: this.openFileDialog
      }) : createElement(Button, _extends({
        onClick: this.openFileDialog
      }, props), children);
      return createElement("div", {
        className: "components-form-file-upload"
      }, ui, createElement("input", {
        type: "file",
        ref: this.bindInput,
        multiple: multiple,
        style: {
          display: 'none'
        },
        accept: accept,
        onChange: onChange
      }));
    }
  }]);

  return FormFileUpload;
}(Component);

export default FormFileUpload;
//# sourceMappingURL=index.js.map