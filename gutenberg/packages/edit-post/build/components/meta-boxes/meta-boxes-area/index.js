"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var MetaBoxesArea = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MetaBoxesArea, _Component);

  var _super = _createSuper(MetaBoxesArea);

  /**
   * @inheritdoc
   */
  function MetaBoxesArea() {
    var _this;

    (0, _classCallCheck2.default)(this, MetaBoxesArea);
    _this = _super.apply(this, arguments);
    _this.bindContainerNode = _this.bindContainerNode.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }
  /**
   * @inheritdoc
   */


  (0, _createClass2.default)(MetaBoxesArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.form = document.querySelector('.metabox-location-' + this.props.location);

      if (this.form) {
        this.container.appendChild(this.form);
      }
    }
    /**
     * Get the meta box location form from the original location.
     */

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.form) {
        document.querySelector('#metaboxes').appendChild(this.form);
      }
    }
    /**
     * Binds the metabox area container node.
     *
     * @param {Element} node DOM Node.
     */

  }, {
    key: "bindContainerNode",
    value: function bindContainerNode(node) {
      this.container = node;
    }
    /**
     * @inheritdoc
     */

  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          location = _this$props.location,
          isSaving = _this$props.isSaving;
      var classes = (0, _classnames.default)('edit-post-meta-boxes-area', "is-".concat(location), {
        'is-loading': isSaving
      });
      return (0, _element.createElement)("div", {
        className: classes
      }, isSaving && (0, _element.createElement)(_components.Spinner, null), (0, _element.createElement)("div", {
        className: "edit-post-meta-boxes-area__container",
        ref: this.bindContainerNode
      }), (0, _element.createElement)("div", {
        className: "edit-post-meta-boxes-area__clear"
      }));
    }
  }]);
  return MetaBoxesArea;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  return {
    isSaving: select('core/edit-post').isSavingMetaBoxes()
  };
})(MetaBoxesArea);

exports.default = _default;
//# sourceMappingURL=index.js.map