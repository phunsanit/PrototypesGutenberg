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
import { BlockList } from '@wordpress/block-editor';
/**
 * Internal dependencies
 */

import Header from './header';

var VisualEditor = /*#__PURE__*/function (_Component) {
  _inherits(VisualEditor, _Component);

  var _super = _createSuper(VisualEditor);

  function VisualEditor(props) {
    var _this;

    _classCallCheck(this, VisualEditor);

    _this = _super.call(this, props);
    _this.renderHeader = _this.renderHeader.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(VisualEditor, [{
    key: "renderHeader",
    value: function renderHeader() {
      var setTitleRef = this.props.setTitleRef;
      return createElement(Header, {
        setTitleRef: setTitleRef
      });
    }
  }, {
    key: "render",
    value: function render() {
      var safeAreaBottomInset = this.props.safeAreaBottomInset;
      return createElement(BlockList, {
        header: this.renderHeader,
        safeAreaBottomInset: safeAreaBottomInset,
        autoScroll: true
      });
    }
  }]);

  return VisualEditor;
}(Component);

export { VisualEditor as default };
//# sourceMappingURL=index.native.js.map