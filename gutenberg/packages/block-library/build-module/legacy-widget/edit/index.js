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
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { Component } from '@wordpress/element';
import { Button, PanelBody, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { withSelect } from '@wordpress/data';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { update } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import LegacyWidgetEditHandler from './handler';
import LegacyWidgetPlaceholder from './placeholder';

var LegacyWidgetEdit = /*#__PURE__*/function (_Component) {
  _inherits(LegacyWidgetEdit, _Component);

  var _super = _createSuper(LegacyWidgetEdit);

  function LegacyWidgetEdit() {
    var _this;

    _classCallCheck(this, LegacyWidgetEdit);

    _this = _super.apply(this, arguments);
    _this.state = {
      hasEditForm: true,
      isPreview: false
    };
    _this.switchToEdit = _this.switchToEdit.bind(_assertThisInitialized(_this));
    _this.switchToPreview = _this.switchToPreview.bind(_assertThisInitialized(_this));
    _this.changeWidget = _this.changeWidget.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LegacyWidgetEdit, [{
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
        return createElement(LegacyWidgetPlaceholder, {
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

      var inspectorControls = widgetObject ? createElement(InspectorControls, null, createElement(PanelBody, {
        title: widgetObject.name
      }, widgetObject.description)) : null;

      if (!hasPermissionsToManageWidgets) {
        return createElement(Fragment, null, inspectorControls, this.renderWidgetPreview());
      }

      return createElement(Fragment, null, createElement(BlockControls, null, createElement(ToolbarGroup, null, widgetObject && !widgetObject.isHidden && createElement(Button, {
        onClick: this.changeWidget,
        label: __('Change widget'),
        icon: update
      }), hasEditForm && createElement(Fragment, null, createElement(Button, {
        className: "components-tab-button",
        isPressed: !isPreview,
        onClick: this.switchToEdit
      }, createElement("span", null, __('Edit'))), createElement(Button, {
        className: "components-tab-button",
        isPressed: isPreview,
        onClick: this.switchToPreview
      }, createElement("span", null, __('Preview')))))), inspectorControls, hasEditForm && createElement(LegacyWidgetEditHandler, {
        isSelected: isSelected,
        isVisible: !isPreview,
        id: id,
        idBase: attributes.idBase || attributes.id,
        number: attributes.number,
        widgetName: get(widgetObject, ['name']),
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
      return createElement(ServerSideRender, {
        className: "wp-block-legacy-widget__preview",
        block: "core/legacy-widget",
        attributes: attributes
      });
    }
  }]);

  return LegacyWidgetEdit;
}(Component);

export default withSelect(function (select) {
  var editorSettings = select('core/block-editor').getSettings();
  var availableLegacyWidgets = editorSettings.availableLegacyWidgets,
      hasPermissionsToManageWidgets = editorSettings.hasPermissionsToManageWidgets;
  return {
    hasPermissionsToManageWidgets: hasPermissionsToManageWidgets,
    availableLegacyWidgets: availableLegacyWidgets
  };
})(LegacyWidgetEdit);
//# sourceMappingURL=index.js.map