"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.UnsupportedBlockEdit = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNative = require("react-native");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _blockLibrary = require("@wordpress/block-library");

var _blocks = require("@wordpress/blocks");

var _i18n = require("@wordpress/i18n");

var _icons = require("@wordpress/icons");

var _style = _interopRequireDefault(require("./style.scss"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var UnsupportedBlockEdit = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(UnsupportedBlockEdit, _Component);

  var _super = _createSuper(UnsupportedBlockEdit);

  function UnsupportedBlockEdit(props) {
    var _this;

    (0, _classCallCheck2.default)(this, UnsupportedBlockEdit);
    _this = _super.call(this, props);
    _this.state = {
      showHelp: false
    };
    return _this;
  }

  (0, _createClass2.default)(UnsupportedBlockEdit, [{
    key: "toggleSheet",
    value: function toggleSheet() {
      this.setState({
        showHelp: !this.state.showHelp
      });
    }
  }, {
    key: "renderHelpIcon",
    value: function renderHelpIcon() {
      var infoIconStyle = this.props.getStylesFromColorScheme(_style.default.infoIcon, _style.default.infoIconDark);
      return (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
        accessibilityLabel: (0, _i18n.__)('Help icon'),
        accessibilityRole: 'button',
        accessibilityHint: (0, _i18n.__)('Tap here to show help'),
        onPress: this.toggleSheet.bind(this)
      }, (0, _element.createElement)(_reactNative.View, {
        style: _style.default.helpIconContainer
      }, (0, _element.createElement)(_components.Icon, {
        className: "unsupported-icon-help",
        label: (0, _i18n.__)('Help icon'),
        icon: _icons.help,
        color: infoIconStyle.color
      })));
    }
  }, {
    key: "renderSheet",
    value: function renderSheet(title) {
      var getStylesFromColorScheme = this.props.getStylesFromColorScheme;
      var infoTextStyle = getStylesFromColorScheme(_style.default.infoText, _style.default.infoTextDark);
      var infoTitleStyle = getStylesFromColorScheme(_style.default.infoTitle, _style.default.infoTitleDark);
      var infoDescriptionStyle = getStylesFromColorScheme(_style.default.infoDescription, _style.default.infoDescriptionDark);
      var infoSheetIconStyle = getStylesFromColorScheme(_style.default.infoSheetIcon, _style.default.infoSheetIconDark);
      var titleFormat = _reactNative.Platform.OS === 'android' ? // translators: %s: Name of the block
      (0, _i18n.__)("'%s' isn't yet supported on WordPress for Android") : // translators: %s: Name of the block
      (0, _i18n.__)("'%s' isn't yet supported on WordPress for iOS");
      var infoTitle = (0, _i18n.sprintf)(titleFormat, title);
      return (0, _element.createElement)(_components.BottomSheet, {
        isVisible: this.state.showHelp,
        hideHeader: true,
        onClose: this.toggleSheet.bind(this)
      }, (0, _element.createElement)(_reactNative.View, {
        style: _style.default.infoContainer
      }, (0, _element.createElement)(_components.Icon, {
        icon: _icons.help,
        color: infoSheetIconStyle.color,
        size: _style.default.infoSheetIcon.size
      }), (0, _element.createElement)(_reactNative.Text, {
        style: [infoTextStyle, infoTitleStyle]
      }, infoTitle), (0, _element.createElement)(_reactNative.Text, {
        style: [infoTextStyle, infoDescriptionStyle]
      }, (0, _i18n.__)('We are working hard to add more blocks with each release. In the meantime, you can also edit this post on the web.'))));
    }
  }, {
    key: "render",
    value: function render() {
      var originalName = this.props.attributes.originalName;
      var _this$props = this.props,
          getStylesFromColorScheme = _this$props.getStylesFromColorScheme,
          preferredColorScheme = _this$props.preferredColorScheme;
      var blockType = _blockLibrary.coreBlocks[originalName];
      var title = blockType ? blockType.settings.title : originalName;
      var titleStyle = getStylesFromColorScheme(_style.default.unsupportedBlockMessage, _style.default.unsupportedBlockMessageDark);
      var subTitleStyle = getStylesFromColorScheme(_style.default.unsupportedBlockSubtitle, _style.default.unsupportedBlockSubtitleDark);
      var subtitle = (0, _element.createElement)(_reactNative.Text, {
        style: subTitleStyle
      }, (0, _i18n.__)('Unsupported'));
      var icon = blockType ? (0, _blocks.normalizeIconObject)(blockType.settings.icon) : _icons.plugins;
      var iconStyle = getStylesFromColorScheme(_style.default.unsupportedBlockIcon, _style.default.unsupportedBlockIconDark);
      var iconClassName = 'unsupported-icon' + '-' + preferredColorScheme;
      return (0, _element.createElement)(_reactNative.View, {
        style: getStylesFromColorScheme(_style.default.unsupportedBlock, _style.default.unsupportedBlockDark)
      }, this.renderHelpIcon(), (0, _element.createElement)(_components.Icon, {
        className: iconClassName,
        icon: icon && icon.src ? icon.src : icon,
        color: iconStyle.color
      }), (0, _element.createElement)(_reactNative.Text, {
        style: titleStyle
      }, title), subtitle, this.renderSheet(title));
    }
  }]);
  return UnsupportedBlockEdit;
}(_element.Component);

exports.UnsupportedBlockEdit = UnsupportedBlockEdit;

var _default = (0, _compose.withPreferredColorScheme)(UnsupportedBlockEdit);

exports.default = _default;
//# sourceMappingURL=edit.native.js.map