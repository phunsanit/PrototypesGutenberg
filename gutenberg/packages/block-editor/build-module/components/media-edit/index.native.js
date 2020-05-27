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
 * External dependencies
 */
import React from 'react';
import { requestMediaEditor, mediaSources } from 'react-native-gutenberg-bridge';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Picker } from '@wordpress/components';
import { update, brush } from '@wordpress/icons';
export var MEDIA_TYPE_IMAGE = 'image';
export var MEDIA_EDITOR = 'MEDIA_EDITOR';
var editOption = {
  id: MEDIA_EDITOR,
  value: MEDIA_EDITOR,
  label: __('Edit'),
  types: [MEDIA_TYPE_IMAGE],
  icon: brush
};
var replaceOption = {
  id: mediaSources.deviceLibrary,
  value: mediaSources.deviceLibrary,
  label: __('Replace'),
  types: [MEDIA_TYPE_IMAGE],
  icon: update
};
var options = [editOption, replaceOption];
export var MediaEdit = /*#__PURE__*/function (_React$Component) {
  _inherits(MediaEdit, _React$Component);

  var _super = _createSuper(MediaEdit);

  function MediaEdit(props) {
    var _this;

    _classCallCheck(this, MediaEdit);

    _this = _super.call(this, props);
    _this.onPickerPresent = _this.onPickerPresent.bind(_assertThisInitialized(_this));
    _this.onPickerSelect = _this.onPickerSelect.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MediaEdit, [{
    key: "getMediaOptionsItems",
    value: function getMediaOptionsItems() {
      return options;
    }
  }, {
    key: "onPickerPresent",
    value: function onPickerPresent() {
      if (this.picker) {
        this.picker.presentPicker();
      }
    }
  }, {
    key: "onPickerSelect",
    value: function onPickerSelect(value) {
      var _this$props = this.props,
          onSelect = _this$props.onSelect,
          _this$props$multiple = _this$props.multiple,
          multiple = _this$props$multiple === void 0 ? false : _this$props$multiple;

      switch (value) {
        case MEDIA_EDITOR:
          requestMediaEditor(this.props.source.uri, function (media) {
            if (multiple && media || media && media.id) {
              onSelect(media);
            }
          });
          break;

        default:
          this.props.openReplaceMediaOptions();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var mediaOptions = function mediaOptions() {
        return createElement(Picker, {
          hideCancelButton: true,
          ref: function ref(instance) {
            return _this2.picker = instance;
          },
          options: _this2.getMediaOptionsItems(),
          onChange: _this2.onPickerSelect
        });
      };

      return this.props.render({
        open: this.onPickerPresent,
        mediaOptions: mediaOptions
      });
    }
  }]);

  return MediaEdit;
}(React.Component);
export default MediaEdit;
//# sourceMappingURL=index.native.js.map