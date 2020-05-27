"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _reactNative = require("react-native");

var _compose = require("@wordpress/compose");

var _i18n = require("@wordpress/i18n");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _url = require("@wordpress/url");

var _icons = require("@wordpress/icons");

var _richText = _interopRequireDefault(require("./rich-text.scss"));

var _editor = _interopRequireDefault(require("./editor.scss"));

var _colorBackground = _interopRequireDefault(require("./color-background"));

var _linkRel = _interopRequireDefault(require("./link-rel"));

var _colorEdit = _interopRequireDefault(require("./color-edit"));

var _colorProps = _interopRequireDefault(require("./color-props"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var NEW_TAB_REL = 'noreferrer noopener';
var MIN_BORDER_RADIUS_VALUE = 0;
var MAX_BORDER_RADIUS_VALUE = 50;
var INITIAL_MAX_WIDTH = 108;
var PREPEND_HTTP = 'http://';

var ButtonEdit = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ButtonEdit, _Component);

  var _super = _createSuper(ButtonEdit);

  function ButtonEdit(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ButtonEdit);
    _this = _super.call(this, props);
    _this.onChangeText = _this.onChangeText.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeBorderRadius = _this.onChangeBorderRadius.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeLinkRel = _this.onChangeLinkRel.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeOpenInNewTab = _this.onChangeOpenInNewTab.bind((0, _assertThisInitialized2.default)(_this));
    _this.onChangeURL = _this.onChangeURL.bind((0, _assertThisInitialized2.default)(_this));
    _this.onClearSettings = _this.onClearSettings.bind((0, _assertThisInitialized2.default)(_this));
    _this.onLayout = _this.onLayout.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSetMaxWidth = _this.onSetMaxWidth.bind((0, _assertThisInitialized2.default)(_this));
    _this.dismissSheet = _this.dismissSheet.bind((0, _assertThisInitialized2.default)(_this));
    _this.getURLFromClipboard = _this.getURLFromClipboard.bind((0, _assertThisInitialized2.default)(_this));
    _this.onShowLinkSettings = _this.onShowLinkSettings.bind((0, _assertThisInitialized2.default)(_this));
    _this.onHideLinkSettings = _this.onHideLinkSettings.bind((0, _assertThisInitialized2.default)(_this));
    _this.onToggleButtonFocus = _this.onToggleButtonFocus.bind((0, _assertThisInitialized2.default)(_this));
    _this.setRef = _this.setRef.bind((0, _assertThisInitialized2.default)(_this));
    _this.onRemove = _this.onRemove.bind((0, _assertThisInitialized2.default)(_this));
    _this.getPlaceholderWidth = _this.getPlaceholderWidth.bind((0, _assertThisInitialized2.default)(_this)); // `isEditingURL` property is used to prevent from automatically pasting
    // URL from clipboard while trying to clear `Button URL` field and then
    // manually adding specific link

    _this.isEditingURL = false;
    _this.state = {
      maxWidth: INITIAL_MAX_WIDTH,
      isLinkSheetVisible: false,
      isButtonFocused: true,
      placeholderTextWidth: 0
    };
    return _this;
  }

  (0, _createClass2.default)(ButtonEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onSetMaxWidth();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var _this2 = this;

      var _this$props = this.props,
          selectedId = _this$props.selectedId,
          setAttributes = _this$props.setAttributes,
          editorSidebarOpened = _this$props.editorSidebarOpened,
          url = _this$props.attributes.url,
          parentWidth = _this$props.parentWidth;
      var _this$state = this.state,
          isLinkSheetVisible = _this$state.isLinkSheetVisible,
          isButtonFocused = _this$state.isButtonFocused;

      if (prevProps.selectedId !== selectedId) {
        this.onToggleButtonFocus(true);
      }

      if (prevProps.parentWidth !== parentWidth) {
        this.onSetMaxWidth();
      }

      if (prevProps.editorSidebarOpened && !editorSidebarOpened || prevState.isLinkSheetVisible && !isLinkSheetVisible) {
        // Prepends "http://" to an url when closing link settings sheet and button settings sheet
        setAttributes({
          url: (0, _url.prependHTTP)(url)
        }); // Get initial value for `isEditingURL` when closing link settings sheet or button settings sheet

        this.isEditingURL = false;
      } // Blur `RichText` on Android when link settings sheet or button settings sheet is opened,
      // to avoid flashing caret after closing one of them


      if (!prevProps.editorSidebarOpened && editorSidebarOpened || !prevState.isLinkSheetVisible && isLinkSheetVisible) {
        if (_reactNative.Platform.OS === 'android' && this.richTextRef) {
          this.richTextRef.blur();
          this.onToggleButtonFocus(false);
        }
      } // Paste a URL from clipboard


      if ((isLinkSheetVisible || editorSidebarOpened) && !url && !this.isEditingURL) {
        this.getURLFromClipboard();
      }

      if (this.richTextRef) {
        var selectedRichText = this.richTextRef.props.id === selectedId;

        if (!selectedRichText && isButtonFocused) {
          this.onToggleButtonFocus(false);
        }

        if (selectedRichText && selectedId !== prevProps.selectedId && !isButtonFocused) {
          _reactNative.AccessibilityInfo.isScreenReaderEnabled().then(function (enabled) {
            if (enabled) {
              _this2.onToggleButtonFocus(true);

              _this2.richTextRef.focus();
            }
          });
        }
      }
    }
  }, {
    key: "getURLFromClipboard",
    value: function () {
      var _getURLFromClipboard = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var setAttributes, clipboardText;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                setAttributes = this.props.setAttributes;
                _context.next = 3;
                return _reactNative.Clipboard.getString();

              case 3:
                clipboardText = _context.sent;

                if (clipboardText) {
                  _context.next = 6;
                  break;
                }

                return _context.abrupt("return");

              case 6:
                if ((0, _url.isURL)(clipboardText)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return");

              case 8:
                setAttributes({
                  url: clipboardText
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getURLFromClipboard() {
        return _getURLFromClipboard.apply(this, arguments);
      }

      return getURLFromClipboard;
    }()
  }, {
    key: "getBackgroundColor",
    value: function getBackgroundColor() {
      var _colorAndStyleProps$s, _colorAndStyleProps$s2;

      var _this$props2 = this.props,
          backgroundColor = _this$props2.backgroundColor,
          attributes = _this$props2.attributes;
      var gradient = attributes.gradient,
          customGradient = attributes.customGradient;
      var defaultGradients = _blockEditor.SETTINGS_DEFAULTS.gradients;

      if (customGradient || gradient) {
        return customGradient || defaultGradients.find(function (defaultGradient) {
          return defaultGradient.slug === gradient;
        }).gradient;
      }

      var colorAndStyleProps = (0, _colorProps.default)(attributes);
      return ((_colorAndStyleProps$s = colorAndStyleProps.style) === null || _colorAndStyleProps$s === void 0 ? void 0 : _colorAndStyleProps$s.backgroundColor) || ((_colorAndStyleProps$s2 = colorAndStyleProps.style) === null || _colorAndStyleProps$s2 === void 0 ? void 0 : _colorAndStyleProps$s2.background) || // We still need the `backgroundColor.color` to support colors from the color pallete (not custom ones)
      backgroundColor.color || _editor.default.defaultButton.backgroundColor;
    }
  }, {
    key: "getTextColor",
    value: function getTextColor() {
      var _colorAndStyleProps$s3;

      var _this$props3 = this.props,
          textColor = _this$props3.textColor,
          attributes = _this$props3.attributes;
      var colorAndStyleProps = (0, _colorProps.default)(attributes);
      return ((_colorAndStyleProps$s3 = colorAndStyleProps.style) === null || _colorAndStyleProps$s3 === void 0 ? void 0 : _colorAndStyleProps$s3.color) || // We still need the `textColor.color` to support colors from the color pallete (not custom ones)
      textColor.color || _editor.default.defaultButton.color;
    }
  }, {
    key: "onChangeText",
    value: function onChangeText(value) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        text: value
      });
    }
  }, {
    key: "onChangeBorderRadius",
    value: function onChangeBorderRadius(value) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        borderRadius: value
      });
    }
  }, {
    key: "onChangeLinkRel",
    value: function onChangeLinkRel(value) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        rel: value
      });
    }
  }, {
    key: "onChangeURL",
    value: function onChangeURL(value) {
      this.isEditingURL = true;
      var setAttributes = this.props.setAttributes;
      setAttributes({
        url: value
      });
    }
  }, {
    key: "onChangeOpenInNewTab",
    value: function onChangeOpenInNewTab(value) {
      var _this$props4 = this.props,
          setAttributes = _this$props4.setAttributes,
          attributes = _this$props4.attributes;
      var rel = attributes.rel;
      var newLinkTarget = value ? '_blank' : undefined;
      var updatedRel = rel;

      if (newLinkTarget && !rel) {
        updatedRel = NEW_TAB_REL;
      } else if (!newLinkTarget && rel === NEW_TAB_REL) {
        updatedRel = undefined;
      }

      setAttributes({
        linkTarget: newLinkTarget,
        rel: updatedRel
      });
    }
  }, {
    key: "onShowLinkSettings",
    value: function onShowLinkSettings() {
      this.setState({
        isLinkSheetVisible: true
      });
    }
  }, {
    key: "onHideLinkSettings",
    value: function onHideLinkSettings() {
      this.setState({
        isLinkSheetVisible: false
      });
    }
  }, {
    key: "onToggleButtonFocus",
    value: function onToggleButtonFocus(value) {
      this.setState({
        isButtonFocused: value
      });
    }
  }, {
    key: "onClearSettings",
    value: function onClearSettings() {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        url: '',
        rel: '',
        linkTarget: ''
      });
      this.setState({
        isLinkSheetVisible: false
      });
    }
  }, {
    key: "onLayout",
    value: function onLayout(_ref) {
      var nativeEvent = _ref.nativeEvent;
      var width = nativeEvent.layout.width;
      this.onSetMaxWidth(width);
    }
  }, {
    key: "onSetMaxWidth",
    value: function onSetMaxWidth(width) {
      var maxWidth = this.state.maxWidth;
      var parentWidth = this.props.parentWidth;
      var spacing = _editor.default.defaultButton.marginRight;
      var isParentWidthChanged = maxWidth !== parentWidth;
      var isWidthChanged = maxWidth !== width;

      if (parentWidth && !width && isParentWidthChanged) {
        this.setState({
          maxWidth: parentWidth
        });
      } else if (!parentWidth && width && isWidthChanged) {
        this.setState({
          maxWidth: width - spacing
        });
      }
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      var _this$props5 = this.props,
          numOfButtons = _this$props5.numOfButtons,
          onDeleteBlock = _this$props5.onDeleteBlock,
          onReplace = _this$props5.onReplace;

      if (numOfButtons === 1) {
        onDeleteBlock();
      } else {
        onReplace([]);
      }
    }
  }, {
    key: "dismissSheet",
    value: function dismissSheet() {
      this.setState({
        isLinkSheetVisible: false
      });
      this.props.closeSettingsBottomSheet();
    }
  }, {
    key: "getLinkSettings",
    value: function getLinkSettings(url, rel, linkTarget, isCompatibleWithSettings) {
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.TextControl, {
        icon: !isCompatibleWithSettings && _icons.link,
        label: (0, _i18n.__)('Button Link URL'),
        value: url || '',
        valuePlaceholder: (0, _i18n.__)('Add URL'),
        onChange: this.onChangeURL,
        onSubmit: this.dismissSheet,
        autoCapitalize: "none",
        autoCorrect: false // eslint-disable-next-line jsx-a11y/no-autofocus
        ,
        autoFocus: !isCompatibleWithSettings && _reactNative.Platform.OS === 'ios',
        keyboardType: "url"
      }), (0, _element.createElement)(_components.ToggleControl, {
        icon: !isCompatibleWithSettings && _icons.external,
        label: (0, _i18n.__)('Open in new tab'),
        checked: linkTarget === '_blank',
        onChange: this.onChangeOpenInNewTab
      }), (0, _element.createElement)(_components.TextControl, {
        icon: !isCompatibleWithSettings && _linkRel.default,
        label: (0, _i18n.__)('Link Rel'),
        value: rel || '',
        valuePlaceholder: (0, _i18n.__)('None'),
        onChange: this.onChangeLinkRel,
        onSubmit: this.dismissSheet,
        autoCapitalize: "none",
        autoCorrect: false,
        keyboardType: "url"
      }));
    }
  }, {
    key: "setRef",
    value: function setRef(richText) {
      this.richTextRef = richText;
    } // Render `Text` with `placeholderText` styled as a placeholder
    // to calculate its width which then is set as a `minWidth`

  }, {
    key: "getPlaceholderWidth",
    value: function getPlaceholderWidth(placeholderText) {
      var _this3 = this;

      var _this$state2 = this.state,
          maxWidth = _this$state2.maxWidth,
          placeholderTextWidth = _this$state2.placeholderTextWidth;
      return (0, _element.createElement)(_reactNative.Text, {
        style: _editor.default.placeholder,
        onTextLayout: function onTextLayout(_ref2) {
          var nativeEvent = _ref2.nativeEvent;
          var textWidth = nativeEvent.lines[0] && nativeEvent.lines[0].width;

          if (textWidth && textWidth !== placeholderTextWidth) {
            _this3.setState({
              placeholderTextWidth: Math.min(textWidth, maxWidth)
            });
          }
        }
      }, placeholderText);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props6 = this.props,
          attributes = _this$props6.attributes,
          isSelected = _this$props6.isSelected,
          clientId = _this$props6.clientId,
          onReplace = _this$props6.onReplace,
          mergeBlocks = _this$props6.mergeBlocks,
          parentWidth = _this$props6.parentWidth;
      var placeholder = attributes.placeholder,
          text = attributes.text,
          borderRadius = attributes.borderRadius,
          url = attributes.url,
          linkTarget = attributes.linkTarget,
          rel = attributes.rel;
      var _this$state3 = this.state,
          maxWidth = _this$state3.maxWidth,
          isLinkSheetVisible = _this$state3.isLinkSheetVisible,
          isButtonFocused = _this$state3.isButtonFocused,
          placeholderTextWidth = _this$state3.placeholderTextWidth;
      var _styles$defaultButton = _editor.default.defaultButton,
          spacing = _styles$defaultButton.paddingTop,
          borderWidth = _styles$defaultButton.borderWidth;

      if (parentWidth === 0) {
        return null;
      }

      var borderRadiusValue = Number.isInteger(borderRadius) ? borderRadius : _editor.default.defaultButton.borderRadius;
      var outlineBorderRadius = borderRadiusValue > 0 ? borderRadiusValue + spacing + borderWidth : 0; // To achieve proper expanding and shrinking `RichText` on iOS, there is a need to set a `minWidth`
      // value at least on 1 when `RichText` is focused or when is not focused, but `RichText` value is
      // different than empty string.

      var minWidth = isButtonFocused || !isButtonFocused && text && text !== '' ? 1 : placeholderTextWidth; // To achieve proper expanding and shrinking `RichText` on Android, there is a need to set
      // a `placeholder` as an empty string when `RichText` is focused,
      // because `AztecView` is calculating a `minWidth` based on placeholder text.

      var placeholderText = isButtonFocused || !isButtonFocused && text && text !== '' ? '' : placeholder || (0, _i18n.__)('Add text…');
      var backgroundColor = this.getBackgroundColor();
      var textColor = this.getTextColor();
      var actions = [{
        label: (0, _i18n.__)('Remove link'),
        onPress: this.onClearSettings
      }];
      return (0, _element.createElement)(_reactNative.View, {
        onLayout: this.onLayout
      }, this.getPlaceholderWidth(placeholderText), (0, _element.createElement)(_colorBackground.default, {
        borderRadiusValue: borderRadiusValue,
        backgroundColor: backgroundColor,
        isSelected: isSelected
      }, isSelected && (0, _element.createElement)(_reactNative.View, {
        pointerEvents: "none",
        style: [_editor.default.outline, {
          borderRadius: outlineBorderRadius,
          borderColor: backgroundColor
        }]
      }), (0, _element.createElement)(_blockEditor.RichText, {
        setRef: this.setRef,
        placeholder: placeholderText,
        value: text,
        onChange: this.onChangeText,
        style: _objectSpread({}, _richText.default.richText, {
          color: textColor
        }),
        textAlign: "center",
        placeholderTextColor: _editor.default.placeholderTextColor.color,
        identifier: "content",
        tagName: "p",
        minWidth: minWidth,
        maxWidth: maxWidth,
        id: clientId,
        isSelected: isButtonFocused,
        withoutInteractiveFormatting: true,
        unstableOnFocus: function unstableOnFocus() {
          return _this4.onToggleButtonFocus(true);
        },
        __unstableMobileNoFocusOnMount: !isSelected,
        selectionColor: textColor,
        onBlur: function onBlur() {
          _this4.onToggleButtonFocus(false);

          _this4.onSetMaxWidth();
        },
        onReplace: onReplace,
        onRemove: this.onRemove,
        onMerge: mergeBlocks
      })), isSelected && (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.ToolbarGroup, null, (0, _element.createElement)(_components.ToolbarButton, {
        title: (0, _i18n.__)('Edit link'),
        icon: _icons.link,
        onClick: this.onShowLinkSettings,
        isActive: url && url !== PREPEND_HTTP
      }))), (0, _element.createElement)(_components.BottomSheet, {
        isVisible: isLinkSheetVisible,
        onClose: this.onHideLinkSettings,
        hideHeader: true
      }, (0, _element.createElement)(_components.PanelBody, {
        style: _editor.default.linkSettingsPanel
      }, this.getLinkSettings(url, rel, linkTarget)), (0, _element.createElement)(_components.PanelActions, {
        actions: actions
      })), (0, _element.createElement)(_colorEdit.default, this.props), (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Border Settings')
      }, (0, _element.createElement)(_components.RangeControl, {
        label: (0, _i18n.__)('Border Radius'),
        minimumValue: MIN_BORDER_RADIUS_VALUE,
        maximumValue: MAX_BORDER_RADIUS_VALUE,
        value: borderRadiusValue,
        onChange: this.onChangeBorderRadius
      })), (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Link Settings')
      }, this.getLinkSettings(url, rel, linkTarget, true))));
    }
  }]);
  return ButtonEdit;
}(_element.Component);

var _default = (0, _compose.compose)([_compose.withInstanceId, (0, _blockEditor.withColors)('backgroundColor', {
  textColor: 'color'
}), (0, _data.withSelect)(function (select, _ref3) {
  var clientId = _ref3.clientId;

  var _select = select('core/edit-post'),
      isEditorSidebarOpened = _select.isEditorSidebarOpened;

  var _select2 = select('core/block-editor'),
      getSelectedBlockClientId = _select2.getSelectedBlockClientId,
      getBlockCount = _select2.getBlockCount,
      getBlockRootClientId = _select2.getBlockRootClientId;

  var parentId = getBlockRootClientId(clientId);
  var selectedId = getSelectedBlockClientId();
  var numOfButtons = getBlockCount(parentId);
  return {
    selectedId: selectedId,
    editorSidebarOpened: isEditorSidebarOpened(),
    numOfButtons: numOfButtons
  };
}), (0, _data.withDispatch)(function (dispatch) {
  return {
    closeSettingsBottomSheet: function closeSettingsBottomSheet() {
      dispatch('core/edit-post').closeGeneralSidebar();
    }
  };
})])(ButtonEdit);

exports.default = _default;
//# sourceMappingURL=edit.native.js.map