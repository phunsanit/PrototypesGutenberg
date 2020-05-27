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

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _serverSideRender = _interopRequireDefault(require("@wordpress/server-side-render"));

var _icons = require("@wordpress/icons");

var _handler = _interopRequireDefault(require("./handler"));

var _placeholder = _interopRequireDefault(require("./placeholder"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var LegacyWidgetEdit = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(LegacyWidgetEdit, _Component);

  var _super = _createSuper(LegacyWidgetEdit);

  function LegacyWidgetEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, LegacyWidgetEdit);
    _this = _super.apply(this, arguments);
    _this.state = {
      hasEditForm: true,
      isPreview: false
    };
    _this.switchToEdit = _this.switchToEdit.bind((0, _assertThisInitialized2.default)(_this));
    _this.switchToPreview = _this.switchToPreview.bind((0, _assertThisInitialized2.default)(_this));
    _this.changeWidget = _this.changeWidget.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(LegacyWidgetEdit, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          attributes = _this$props.attributes,
          availableLegacyWidgets = _this$props.availableLegacyWidgets,
          hasPermissionsToManageWidgets = _this$props.hasPermissionsToManageWidgets,
          isSelected = _this$props.isSelected,
          setAttributes = _this$props.setAttributes;
      var _this$state = this.state,
          isPreview = _this$state.isPreview,
          hasEditForm = _this$state.hasEditForm;
      var id = attributes.id,
          widgetClass = attributes.widgetClass;
      var widgetObject = id && availableLegacyWidgets[id] || widgetClass && availableLegacyWidgets[widgetClass];

      if (!id && !widgetClass) {
        return (0, _element.createElement)(_placeholder.default, {
          availableLegacyWidgets: availableLegacyWidgets,
          hasPermissionsToManageWidgets: hasPermissionsToManageWidgets,
          onChangeWidget: function onChangeWidget(newWidget) {
            var isReferenceWidget = availableLegacyWidgets[newWidget].isReferenceWidget;
            setAttributes({
              instance: {},
              id: isReferenceWidget ? newWidget : undefined,
              widgetClass: isReferenceWidget ? undefined : newWidget
            });
          }
        });
      }

      var inspectorControls = widgetObject ? (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: widgetObject.name
      }, widgetObject.description)) : null;

      if (!hasPermissionsToManageWidgets) {
        return (0, _element.createElement)(_element.Fragment, null, inspectorControls, this.renderWidgetPreview());
      }

      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.ToolbarGroup, null, widgetObject && !widgetObject.isHidden && (0, _element.createElement)(_components.Button, {
        onClick: this.changeWidget,
        label: (0, _i18n.__)('Change widget'),
        icon: _icons.update
      }), hasEditForm && (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Button, {
        className: "components-tab-button",
        isPressed: !isPreview,
        onClick: this.switchToEdit
      }, (0, _element.createElement)("span", null, (0, _i18n.__)('Edit'))), (0, _element.createElement)(_components.Button, {
        className: "components-tab-button",
        isPressed: isPreview,
        onClick: this.switchToPreview
      }, (0, _element.createElement)("span", null, (0, _i18n.__)('Preview')))))), inspectorControls, hasEditForm && (0, _element.createElement)(_handler.default, {
        isSelected: isSelected,
        isVisible: !isPreview,
        id: id,
        idBase: attributes.idBase || attributes.id,
        number: attributes.number,
        widgetName: (0, _lodash.get)(widgetObject, ['name']),
        widgetClass: attributes.widgetClass,
        instance: attributes.instance,
        onInstanceChange: function onInstanceChange(newInstance, newHasEditForm) {
          if (newInstance) {
            _this2.props.setAttributes({
              instance: newInstance
            });
          }

          if (newHasEditForm !== _this2.hasEditForm) {
            _this2.setState({
              hasEditForm: newHasEditForm
            });
          }
        }
      }), (isPreview || !hasEditForm) && this.renderWidgetPreview());
    }
  }, {
    key: "changeWidget",
    value: function changeWidget() {
      this.switchToEdit();
      this.props.setAttributes({
        instance: {},
        id: undefined,
        widgetClass: undefined
      });
      this.setState({
        hasEditForm: true
      });
    }
  }, {
    key: "switchToEdit",
    value: function switchToEdit() {
      this.setState({
        isPreview: false
      });
    }
  }, {
    key: "switchToPreview",
    value: function switchToPreview() {
      this.setState({
        isPreview: true
      });
    }
  }, {
    key: "renderWidgetPreview",
    value: function renderWidgetPreview() {
      var attributes = this.props.attributes;
      return (0, _element.createElement)(_serverSideRender.default, {
        className: "wp-block-legacy-widget__preview",
        block: "core/legacy-widget",
        attributes: attributes
      });
    }
  }]);
  return LegacyWidgetEdit;
}(_element.Component);

var _default = (0, _data.withSelect)(function (select) {
  var editorSettings = select('core/block-editor').getSettings();
  var availableLegacyWidgets = editorSettings.availableLegacyWidgets,
      hasPermissionsToManageWidgets = editorSettings.hasPermissionsToManageWidgets;
  return {
    hasPermissionsToManageWidgets: hasPermissionsToManageWidgets,
    availableLegacyWidgets: availableLegacyWidgets
  };
})(LegacyWidgetEdit);

exports.default = _default;
//# sourceMappingURL=index.js.map