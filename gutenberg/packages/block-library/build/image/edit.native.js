"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ImageEdit = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeGutenbergBridge = require("react-native-gutenberg-bridge");

var _lodash = require("lodash");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _url = require("@wordpress/url");

var _hooks = require("@wordpress/hooks");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _styles = _interopRequireDefault(require("./styles.scss"));

var _iconRetry = _interopRequireDefault(require("./icon-retry"));

var _iconCustomize = _interopRequireDefault(require("./icon-customize"));

var _utils = require("./utils");

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var ICON_TYPE = {
  PLACEHOLDER: 'placeholder',
  RETRY: 'retry',
  UPLOAD: 'upload'
}; // Default Image ratio 4:3

var IMAGE_ASPECT_RATIO = 4 / 3;

var getUrlForSlug = function getUrlForSlug(image, _ref) {
  var sizeSlug = _ref.sizeSlug;
  return (0, _lodash.get)(image, ['media_details', 'sizes', sizeSlug, 'source_url']);
};

var ImageEdit = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2.default)(ImageEdit, _React$Component);

  var _super = _createSuper(ImageEdit);

  function ImageEdit(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ImageEdit);
    _this = _super.call(this, props);
    _this.state = {
      isCaptionSelected: false
    };
    _this.finishMediaUploadWithSuccess = _this.finishMediaUploadWithSuccess.bind((0, _assertThisInitialized2.default)(_this));
    _this.finishMediaUploadWithFailure = _this.finishMediaUploadWithFailure.bind((0, _assertThisInitialized2.default)(_this));
    _this.mediaUploadStateReset = _this.mediaUploadStateReset.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSelectMediaUploadOption = _this.onSelectMediaUploadOption.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateMediaProgress = _this.updateMediaProgress.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateAlt = _this.updateAlt.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateImageURL = _this.updateImageURL.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSetLinkDestination = _this.onSetLinkDestination.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSetNewTab = _this.onSetNewTab.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSetSizeSlug = _this.onSetSizeSlug.bind((0, _assertThisInitialized2.default)(_this));
    _this.onImagePressed = _this.onImagePressed.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFocusCaption = _this.onFocusCaption.bind((0, _assertThisInitialized2.default)(_this));
    _this.updateAlignment = _this.updateAlignment.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(ImageEdit, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          setAttributes = _this$props.setAttributes; // This will warn when we have `id` defined, while `url` is undefined.
      // This may help track this issue: https://github.com/wordpress-mobile/WordPress-Android/issues/9768
      // where a cancelled image upload was resulting in a subsequent crash.

      if (attributes.id && !attributes.url) {
        // eslint-disable-next-line no-console
        console.warn('Attributes has id with no url.');
      } // Detect any pasted image and start an upload


      if (!attributes.id && attributes.url && (0, _url.getProtocol)(attributes.url) === 'file:') {
        (0, _reactNativeGutenbergBridge.requestMediaImport)(attributes.url, function (id, url) {
          if (url) {
            setAttributes({
              id: id,
              url: url
            });
          }
        });
      } // Make sure we mark any temporary images as failed if they failed while
      // the editor wasn't open


      if (attributes.id && attributes.url && (0, _url.getProtocol)(attributes.url) === 'file:') {
        (0, _reactNativeGutenbergBridge.mediaUploadSync)();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // this action will only exist if the user pressed the trash button on the block holder
      if ((0, _hooks.hasAction)('blocks.onRemoveBlockCheckUpload') && this.state.isUploadInProgress) {
        (0, _hooks.doAction)('blocks.onRemoveBlockCheckUpload', this.props.attributes.id);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(previousProps) {
      if (!previousProps.image && this.props.image) {
        var _this$props2 = this.props,
            image = _this$props2.image,
            attributes = _this$props2.attributes;
        var url = getUrlForSlug(image, attributes) || image.source_url;
        this.props.setAttributes({
          url: url
        });
      }
    }
  }, {
    key: "onImagePressed",
    value: function onImagePressed() {
      var _this$props3 = this.props,
          attributes = _this$props3.attributes,
          image = _this$props3.image;

      if (this.state.isUploadInProgress) {
        (0, _reactNativeGutenbergBridge.requestImageUploadCancelDialog)(attributes.id);
      } else if (attributes.id && (0, _url.getProtocol)(attributes.url) === 'file:') {
        (0, _reactNativeGutenbergBridge.requestImageFailedRetryDialog)(attributes.id);
      } else if (!this.state.isCaptionSelected) {
        (0, _reactNativeGutenbergBridge.requestImageFullscreenPreview)(attributes.url, image && image.source_url);
      }

      this.setState({
        isCaptionSelected: false
      });
    }
  }, {
    key: "updateMediaProgress",
    value: function updateMediaProgress(payload) {
      var setAttributes = this.props.setAttributes;

      if (payload.mediaUrl) {
        setAttributes({
          url: payload.mediaUrl
        });
      }

      if (!this.state.isUploadInProgress) {
        this.setState({
          isUploadInProgress: true
        });
      }
    }
  }, {
    key: "finishMediaUploadWithSuccess",
    value: function finishMediaUploadWithSuccess(payload) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        url: payload.mediaUrl,
        id: payload.mediaServerId
      });
      this.setState({
        isUploadInProgress: false
      });
    }
  }, {
    key: "finishMediaUploadWithFailure",
    value: function finishMediaUploadWithFailure(payload) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        id: payload.mediaId
      });
      this.setState({
        isUploadInProgress: false
      });
    }
  }, {
    key: "mediaUploadStateReset",
    value: function mediaUploadStateReset() {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        id: null,
        url: null
      });
      this.setState({
        isUploadInProgress: false
      });
    }
  }, {
    key: "updateAlt",
    value: function updateAlt(newAlt) {
      this.props.setAttributes({
        alt: newAlt
      });
    }
  }, {
    key: "updateImageURL",
    value: function updateImageURL(url) {
      this.props.setAttributes({
        url: url,
        width: undefined,
        height: undefined
      });
    }
  }, {
    key: "updateAlignment",
    value: function updateAlignment(nextAlign) {
      this.props.setAttributes({
        align: nextAlign
      });
    }
  }, {
    key: "onSetLinkDestination",
    value: function onSetLinkDestination(href) {
      this.props.setAttributes({
        linkDestination: _constants.LINK_DESTINATION_CUSTOM,
        href: href
      });
    }
  }, {
    key: "onSetNewTab",
    value: function onSetNewTab(value) {
      var updatedLinkTarget = (0, _utils.getUpdatedLinkTargetSettings)(value, this.props.attributes);
      this.props.setAttributes(updatedLinkTarget);
    }
  }, {
    key: "onSetSizeSlug",
    value: function onSetSizeSlug(sizeSlug) {
      var image = this.props.image;
      var url = getUrlForSlug(image, {
        sizeSlug: sizeSlug
      });

      if (!url) {
        return null;
      }

      this.props.setAttributes({
        url: url,
        width: undefined,
        height: undefined,
        sizeSlug: sizeSlug
      });
    }
  }, {
    key: "onSelectMediaUploadOption",
    value: function onSelectMediaUploadOption(media) {
      var _this$props$attribute = this.props.attributes,
          id = _this$props$attribute.id,
          url = _this$props$attribute.url;
      var mediaAttributes = {
        id: media.id,
        url: media.url,
        caption: media.caption
      };
      var additionalAttributes; // Reset the dimension attributes if changing to a different image.

      if (!media.id || media.id !== id) {
        additionalAttributes = {
          width: undefined,
          height: undefined,
          sizeSlug: _constants.DEFAULT_SIZE_SLUG
        };
      } else {
        // Keep the same url when selecting the same file, so "Image Size" option is not changed.
        additionalAttributes = {
          url: url
        };
      }

      this.props.setAttributes(_objectSpread({}, mediaAttributes, {}, additionalAttributes));
    }
  }, {
    key: "onFocusCaption",
    value: function onFocusCaption() {
      if (this.props.onFocus) {
        this.props.onFocus();
      }

      if (!this.state.isCaptionSelected) {
        this.setState({
          isCaptionSelected: true
        });
      }
    }
  }, {
    key: "getIcon",
    value: function getIcon(iconType) {
      var iconStyle;

      switch (iconType) {
        case ICON_TYPE.RETRY:
          return (0, _element.createElement)(_components.Icon, (0, _extends2.default)({
            icon: _iconRetry.default
          }, _styles.default.iconRetry));

        case ICON_TYPE.PLACEHOLDER:
          iconStyle = this.props.getStylesFromColorScheme(_styles.default.iconPlaceholder, _styles.default.iconPlaceholderDark);
          break;

        case ICON_TYPE.UPLOAD:
          iconStyle = this.props.getStylesFromColorScheme(_styles.default.iconUpload, _styles.default.iconUploadDark);
          break;
      }

      return (0, _element.createElement)(_components.Icon, (0, _extends2.default)({
        icon: _icons.image
      }, iconStyle));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props4 = this.props,
          attributes = _this$props4.attributes,
          isSelected = _this$props4.isSelected,
          image = _this$props4.image,
          imageSizes = _this$props4.imageSizes;
      var align = attributes.align,
          url = attributes.url,
          height = attributes.height,
          width = attributes.width,
          alt = attributes.alt,
          href = attributes.href,
          id = attributes.id,
          linkTarget = attributes.linkTarget,
          sizeSlug = attributes.sizeSlug;
      var sizeOptions = (0, _lodash.map)(imageSizes, function (_ref2) {
        var name = _ref2.name,
            slug = _ref2.slug;
        return {
          value: slug,
          name: name
        };
      });
      var sizeOptionsValid = (0, _lodash.find)(sizeOptions, ['value', _constants.DEFAULT_SIZE_SLUG]);

      var getToolbarEditButton = function getToolbarEditButton(open) {
        return (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.ToolbarGroup, null, (0, _element.createElement)(_components.ToolbarButton, {
          title: (0, _i18n.__)('Edit image'),
          icon: _icons.replace,
          onClick: open
        })), (0, _element.createElement)(_blockEditor.BlockAlignmentToolbar, {
          value: align,
          onChange: _this2.updateAlignment
        }));
      };

      var getInspectorControls = function getInspectorControls() {
        return (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
          title: (0, _i18n.__)('Image settings')
        }, (0, _element.createElement)(_components.TextControl, {
          icon: _icons.link,
          label: (0, _i18n.__)('Link To'),
          value: href || '',
          valuePlaceholder: (0, _i18n.__)('Add URL'),
          onChange: _this2.onSetLinkDestination,
          autoCapitalize: "none",
          autoCorrect: false,
          keyboardType: "url"
        }), (0, _element.createElement)(_components.ToggleControl, {
          icon: _icons.external,
          label: (0, _i18n.__)('Open in new tab'),
          checked: linkTarget === '_blank',
          onChange: _this2.onSetNewTab
        }), image && sizeOptionsValid && (0, _element.createElement)(_components.CycleSelectControl, {
          icon: 'editor-expand',
          label: (0, _i18n.__)('Size'),
          value: sizeSlug || _constants.DEFAULT_SIZE_SLUG,
          onChangeValue: function onChangeValue(newValue) {
            return _this2.onSetSizeSlug(newValue);
          },
          options: sizeOptions
        }), (0, _element.createElement)(_components.TextControl, {
          icon: _icons.textColor,
          label: (0, _i18n.__)('Alt Text'),
          value: alt || '',
          valuePlaceholder: (0, _i18n.__)('None'),
          onChangeValue: _this2.updateAlt
        })));
      };

      if (!url) {
        return (0, _element.createElement)(_reactNative.View, {
          style: {
            flex: 1
          }
        }, (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
          allowedTypes: [_blockEditor.MEDIA_TYPE_IMAGE],
          onSelect: this.onSelectMediaUploadOption,
          icon: this.getIcon(ICON_TYPE.PLACEHOLDER),
          onFocus: this.props.onFocus
        }));
      }

      var alignToFlex = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
        full: 'center',
        wide: 'center'
      };
      var imageContainerHeight = _reactNative.Dimensions.get('window').width / IMAGE_ASPECT_RATIO;

      var editImageComponent = function editImageComponent(_ref3) {
        var open = _ref3.open,
            mediaOptions = _ref3.mediaOptions;
        return (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
          onPress: open
        }, (0, _element.createElement)(_reactNative.View, {
          style: _styles.default.editContainer
        }, (0, _element.createElement)(_reactNative.View, {
          style: _styles.default.edit
        }, mediaOptions(), (0, _element.createElement)(_components.Icon, (0, _extends2.default)({
          size: 16,
          icon: _iconCustomize.default
        }, _styles.default.iconCustomise)))));
      };

      var getImageComponent = function getImageComponent(openMediaOptions, getMediaOptions) {
        return (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
          accessible: !isSelected,
          onPress: _this2.onImagePressed,
          onLongPress: openMediaOptions,
          disabled: !isSelected
        }, (0, _element.createElement)(_reactNative.View, {
          style: {
            flex: 1
          }
        }, getInspectorControls(), getMediaOptions(), !_this2.state.isCaptionSelected && getToolbarEditButton(openMediaOptions), (0, _element.createElement)(_blockEditor.MediaUploadProgress, {
          height: height,
          width: width,
          coverUrl: url,
          mediaId: id,
          onUpdateMediaProgress: _this2.updateMediaProgress,
          onFinishMediaUploadWithSuccess: _this2.finishMediaUploadWithSuccess,
          onFinishMediaUploadWithFailure: _this2.finishMediaUploadWithFailure,
          onMediaUploadStateReset: _this2.mediaUploadStateReset,
          renderContent: function renderContent(_ref4) {
            var isUploadInProgress = _ref4.isUploadInProgress,
                isUploadFailed = _ref4.isUploadFailed,
                finalWidth = _ref4.finalWidth,
                finalHeight = _ref4.finalHeight,
                imageWidthWithinContainer = _ref4.imageWidthWithinContainer,
                retryMessage = _ref4.retryMessage;
            var opacity = isUploadInProgress ? 0.3 : 1;
            var imageBorderOnSelectedStyle = isSelected && !(isUploadInProgress || isUploadFailed || _this2.state.isCaptionSelected) ? _styles.default.imageBorder : '';
            var iconRetryContainer = (0, _element.createElement)(_reactNative.View, {
              style: _styles.default.modalIcon
            }, _this2.getIcon(ICON_TYPE.RETRY));
            return (0, _element.createElement)(_reactNative.View, {
              style: {
                flex: 1,
                // only set alignSelf if an image exists because alignSelf causes the placeholder
                // to disappear when an aligned image can't be downloaded
                // https://github.com/wordpress-mobile/gutenberg-mobile/issues/1592
                alignSelf: imageWidthWithinContainer && alignToFlex[align]
              }
            }, !imageWidthWithinContainer && (0, _element.createElement)(_reactNative.View, {
              style: [_this2.props.getStylesFromColorScheme(_styles.default.imageContainerUpload, _styles.default.imageContainerUploadDark), {
                height: imageContainerHeight
              }]
            }, (0, _element.createElement)(_reactNative.View, {
              style: _styles.default.imageUploadingIconContainer
            }, _this2.getIcon(ICON_TYPE.UPLOAD))), (0, _element.createElement)(_reactNative.ImageBackground, {
              accessible: true,
              disabled: !isSelected,
              accessibilityLabel: alt,
              accessibilityHint: (0, _i18n.__)('Double tap and hold to edit'),
              accessibilityRole: 'imagebutton',
              style: [imageBorderOnSelectedStyle, {
                width: finalWidth,
                height: finalHeight,
                opacity: opacity
              }],
              resizeMethod: "scale",
              source: {
                uri: url
              },
              key: url
            }, isUploadFailed && (0, _element.createElement)(_reactNative.View, {
              style: [_styles.default.imageContainer, {
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }]
            }, iconRetryContainer, (0, _element.createElement)(_reactNative.Text, {
              style: _styles.default.uploadFailedText
            }, retryMessage)), isSelected && !isUploadInProgress && !isUploadFailed && finalWidth && finalHeight && (0, _element.createElement)(_blockEditor.MediaEdit, {
              allowedTypes: [_blockEditor.MEDIA_TYPE_IMAGE],
              onSelect: _this2.onSelectMediaUploadOption,
              source: {
                uri: url
              },
              openReplaceMediaOptions: openMediaOptions,
              render: editImageComponent
            })));
          }
        }), (0, _element.createElement)(_blockEditor.BlockCaption, {
          clientId: _this2.props.clientId,
          isSelected: _this2.state.isCaptionSelected,
          accessible: true,
          accessibilityLabelCreator: function accessibilityLabelCreator(caption) {
            return (0, _lodash.isEmpty)(caption) ?
            /* translators: accessibility text. Empty image caption. */
            'Image caption. Empty' : (0, _i18n.sprintf)(
            /* translators: accessibility text. %s: image caption. */
            (0, _i18n.__)('Image caption. %s'), caption);
          },
          onFocus: _this2.onFocusCaption,
          onBlur: _this2.props.onBlur // always assign onBlur as props

        })));
      };

      return (0, _element.createElement)(_blockEditor.MediaUpload, {
        allowedTypes: [_blockEditor.MEDIA_TYPE_IMAGE],
        onSelect: this.onSelectMediaUploadOption,
        render: function render(_ref5) {
          var open = _ref5.open,
              getMediaOptions = _ref5.getMediaOptions;
          return getImageComponent(open, getMediaOptions);
        }
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      // Avoid a UI flicker in the toolbar by insuring that isCaptionSelected
      // is updated immediately any time the isSelected prop becomes false
      return {
        isCaptionSelected: props.isSelected && state.isCaptionSelected
      };
    }
  }]);
  return ImageEdit;
}(_react.default.Component);

exports.ImageEdit = ImageEdit;

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, props) {
  var _select = select('core'),
      getMedia = _select.getMedia;

  var _select2 = select('core/block-editor'),
      getSettings = _select2.getSettings;

  var _props$attributes = props.attributes,
      id = _props$attributes.id,
      url = _props$attributes.url,
      isSelected = props.isSelected;

  var _getSettings = getSettings(),
      imageSizes = _getSettings.imageSizes;

  var shouldGetMedia = id && isSelected && (0, _url.getProtocol)(url) !== 'file:';
  return {
    image: shouldGetMedia ? getMedia(id) : null,
    imageSizes: imageSizes
  };
}), _compose.withPreferredColorScheme])(ImageEdit);

exports.default = _default;
//# sourceMappingURL=edit.native.js.map