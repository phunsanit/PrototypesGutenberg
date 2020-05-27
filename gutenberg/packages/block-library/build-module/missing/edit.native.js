import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import { Platform, View, Text, TouchableWithoutFeedback } from 'react-native';
/**
 * WordPress dependencies
 */

import { BottomSheet, Icon } from '@wordpress/components';
import { withPreferredColorScheme } from '@wordpress/compose';
import { coreBlocks } from '@wordpress/block-library';
import { normalizeIconObject } from '@wordpress/blocks';
import { Component } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { help, plugins } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import styles from './style.scss';
export var UnsupportedBlockEdit = /*#__PURE__*/function (_Component) {
  _inherits(UnsupportedBlockEdit, _Component);

  var _super = _createSuper(UnsupportedBlockEdit);

  function UnsupportedBlockEdit(props) {
    var _this;

    _classCallCheck(this, UnsupportedBlockEdit);

    _this = _super.call(this, props);
    _this.state = {
      showHelp: false
    };
    return _this;
  }

  _createClass(UnsupportedBlockEdit, [{
    key: "toggleSheet",
    value: function toggleSheet() {
      this.setState({
        showHelp: !this.state.showHelp
      });
    }
  }, {
    key: "renderHelpIcon",
    value: function renderHelpIcon() {
      var infoIconStyle = this.props.getStylesFromColorScheme(styles.infoIcon, styles.infoIconDark);
      return createElement(TouchableWithoutFeedback, {
        accessibilityLabel: __('Help icon'),
        accessibilityRole: 'button',
        accessibilityHint: __('Tap here to show help'),
        onPress: this.toggleSheet.bind(this)
      }, createElement(View, {
        style: styles.helpIconContainer
      }, createElement(Icon, {
        className: "unsupported-icon-help",
        label: __('Help icon'),
        icon: help,
        color: infoIconStyle.color
      })));
    }
  }, {
    key: "renderSheet",
    value: function renderSheet(title) {
      var getStylesFromColorScheme = this.props.getStylesFromColorScheme;
      var infoTextStyle = getStylesFromColorScheme(styles.infoText, styles.infoTextDark);
      var infoTitleStyle = getStylesFromColorScheme(styles.infoTitle, styles.infoTitleDark);
      var infoDescriptionStyle = getStylesFromColorScheme(styles.infoDescription, styles.infoDescriptionDark);
      var infoSheetIconStyle = getStylesFromColorScheme(styles.infoSheetIcon, styles.infoSheetIconDark);
      var titleFormat = Platform.OS === 'android' ? // translators: %s: Name of the block
      __("'%s' isn't yet supported on WordPress for Android") : // translators: %s: Name of the block
      __("'%s' isn't yet supported on WordPress for iOS");
      var infoTitle = sprintf(titleFormat, title);
      return createElement(BottomSheet, {
        isVisible: this.state.showHelp,
        hideHeader: true,
        onClose: this.toggleSheet.bind(this)
      }, createElement(View, {
        style: styles.infoContainer
      }, createElement(Icon, {
        icon: help,
        color: infoSheetIconStyle.color,
        size: styles.infoSheetIcon.size
      }), createElement(Text, {
        style: [infoTextStyle, infoTitleStyle]
      }, infoTitle), createElement(Text, {
        style: [infoTextStyle, infoDescriptionStyle]
      }, __('We are working hard to add more blocks with each release. In the meantime, you can also edit this post on the web.'))));
    }
  }, {
    key: "render",
    value: function render() {
      var originalName = this.props.attributes.originalName;
      var _this$props = this.props,
          getStylesFromColorScheme = _this$props.getStylesFromColorScheme,
          preferredColorScheme = _this$props.preferredColorScheme;
      var blockType = coreBlocks[originalName];
      var title = blockType ? blockType.settings.title : originalName;
      var titleStyle = getStylesFromColorScheme(styles.unsupportedBlockMessage, styles.unsupportedBlockMessageDark);
      var subTitleStyle = getStylesFromColorScheme(styles.unsupportedBlockSubtitle, styles.unsupportedBlockSubtitleDark);
      var subtitle = createElement(Text, {
        style: subTitleStyle
      }, __('Unsupported'));
      var icon = blockType ? normalizeIconObject(blockType.settings.icon) : plugins;
      var iconStyle = getStylesFromColorScheme(styles.unsupportedBlockIcon, styles.unsupportedBlockIconDark);
      var iconClassName = 'unsupported-icon' + '-' + preferredColorScheme;
      return createElement(View, {
        style: getStylesFromColorScheme(styles.unsupportedBlock, styles.unsupportedBlockDark)
      }, this.renderHelpIcon(), createElement(Icon, {
        className: iconClassName,
        icon: icon && icon.src ? icon.src : icon,
        color: iconStyle.color
      }), createElement(Text, {
        style: titleStyle
      }, title), subtitle, this.renderSheet(title));
    }
  }]);

  return UnsupportedBlockEdit;
}(Component);
export default withPreferredColorScheme(UnsupportedBlockEdit);
//# sourceMappingURL=edit.native.js.map