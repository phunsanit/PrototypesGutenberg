import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import React from 'react';
import { View, ImageBackground, Text, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { requestMediaImport, mediaUploadSync, requestImageFailedRetryDialog, requestImageUploadCancelDialog, requestImageFullscreenPreview } from 'react-native-gutenberg-bridge';
import { isEmpty, get, find, map } from 'lodash';
/**
 * WordPress dependencies
 */

import { CycleSelectControl, Icon, PanelBody, TextControl, ToggleControl, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { BlockCaption, MediaPlaceholder, MediaUpload, MediaUploadProgress, MEDIA_TYPE_IMAGE, BlockControls, InspectorControls, BlockAlignmentToolbar, MediaEdit } from '@wordpress/block-editor';
import { __, sprintf } from '@wordpress/i18n';
import { getProtocol } from '@wordpress/url';
import { doAction, hasAction } from '@wordpress/hooks';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { external, link, image as icon, textColor, replace } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import styles from './styles.scss';
import SvgIconRetry from './icon-retry';
import SvgIconCustomize from './icon-customize';
import { getUpdatedLinkTargetSettings } from './utils';
import { LINK_DESTINATION_CUSTOM, DEFAULT_SIZE_SLUG } from './constants';
var ICON_TYPE = {
  PLACEHOLDER: 'placeholder',
  RETRY: 'retry',
  UPLOAD: 'upload'
}; // Default Image ratio 4:3

var IMAGE_ASPECT_RATIO = 4 / 3;

var getUrlForSlug = function getUrlForSlug(image, _ref) {
  var sizeSlug = _ref.sizeSlug;
  return get(image, ['media_details', 'sizes', sizeSlug, 'source_url']);
};

export var ImageEdit = /*#__PURE__*/function (_React$Component) {
  _inherits(ImageEdit, _React$Component);

  var _super = _createSuper(ImageEdit);

  function ImageEdit(props) {
    var _this;

    _classCallCheck(this, ImageEdit);

    _this = _super.call(this, props);
    _this.state = {
      isCaptionSelected: false
    };
    _this.finishMediaUploadWithSuccess = _this.finishMediaUploadWithSuccess.bind(_assertThisInitialized(_this));
    _this.finishMediaUploadWithFailure = _this.finishMediaUploadWithFailure.bind(_assertThisInitialized(_this));
    _this.mediaUploadStateReset = _this.mediaUploadStateReset.bind(_assertThisInitialized(_this));
    _this.onSelectMediaUploadOption = _this.onSelectMediaUploadOption.bind(_assertThisInitialized(_this));
    _this.updateMediaProgress = _this.updateMediaProgress.bind(_assertThisInitialized(_this));
    _this.updateAlt = _this.updateAlt.bind(_assertThisInitialized(_this));
    _this.updateImageURL = _this.updateImageURL.bind(_assertThisInitialized(_this));
    _this.onSetLinkDestination = _this.onSetLinkDestination.bind(_assertThisInitialized(_this));
    _this.onSetNewTab = _this.onSetNewTab.bind(_assertThisInitialized(_this));
    _this.onSetSizeSlug = _this.onSetSizeSlug.bind(_assertThisInitialized(_this));
    _this.onImagePressed = _this.onImagePressed.bind(_assertThisInitialized(_this));
    _this.onFocusCaption = _this.onFocusCaption.bind(_assertThisInitialized(_this));
    _this.updateAlignment = _this.updateAlignment.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ImageEdit, [{
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


      if (!attributes.id && attributes.url && getProtocol(attributes.url) === 'file:') {
        requestMediaImport(attributes.url, function (id, url) {
          if (url) {
            setAttributes({
              id: id,
              url: url
            });
          }
        });
      } // Make sure we mark any temporary images as failed if they failed while
      // the editor wasn't open


      if (attributes.id && attributes.url && getProtocol(attributes.url) === 'file:') {
        mediaUploadSync();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      // this action will only exist if the user pressed the trash button on the block holder
      if (hasAction('blocks.onRemoveBlockCheckUpload') && this.state.isUploadInProgress) {
        doAction('blocks.onRemoveBlockCheckUpload', this.props.attributes.id);
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
        requestImageUploadCancelDialog(attributes.id);
      } else if (attributes.id && getProtocol(attributes.url) === 'file:') {
        requestImageFailedRetryDialog(attributes.id);
      } else if (!this.state.isCaptionSelected) {
        requestImageFullscreenPreview(attributes.url, image && image.source_url);
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
        linkDestination: LINK_DESTINATION_CUSTOM,
        href: href
      });
    }
  }, {
    key: "onSetNewTab",
    value: function onSetNewTab(value) {
      var updatedLinkTarget = getUpdatedLinkTargetSettings(value, this.props.attributes);
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
          sizeSlug: DEFAULT_SIZE_SLUG
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
          return createElement(Icon, _extends({
            icon: SvgIconRetry
          }, styles.iconRetry));

        case ICON_TYPE.PLACEHOLDER:
          iconStyle = this.props.getStylesFromColorScheme(styles.iconPlaceholder, styles.iconPlaceholderDark);
          break;

        case ICON_TYPE.UPLOAD:
          iconStyle = this.props.getStylesFromColorScheme(styles.iconUpload, styles.iconUploadDark);
          break;
      }

      return createElement(Icon, _extends({
        icon: icon
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
      var sizeOptions = map(imageSizes, function (_ref2) {
        var name = _ref2.name,
            slug = _ref2.slug;
        return {
          value: slug,
          name: name
        };
      });
      var sizeOptionsValid = find(sizeOptions, ['value', DEFAULT_SIZE_SLUG]);

      var getToolbarEditButton = function getToolbarEditButton(open) {
        return createElement(BlockControls, null, createElement(ToolbarGroup, null, createElement(ToolbarButton, {
          title: __('Edit image'),
          icon: replace,
          onClick: open
        })), createElement(BlockAlignmentToolbar, {
          value: align,
          onChange: _this2.updateAlignment
        }));
      };

      var getInspectorControls = function getInspectorControls() {
        return createElement(InspectorControls, null, createElement(PanelBody, {
          title: __('Image settings')
        }, createElement(TextControl, {
          icon: link,
          label: __('Link To'),
          value: href || '',
          valuePlaceholder: __('Add URL'),
          onChange: _this2.onSetLinkDestination,
          autoCapitalize: "none",
          autoCorrect: false,
          keyboardType: "url"
        }), createElement(ToggleControl, {
          icon: external,
          label: __('Open in new tab'),
          checked: linkTarget === '_blank',
          onChange: _this2.onSetNewTab
        }), image && sizeOptionsValid && createElement(CycleSelectControl, {
          icon: 'editor-expand',
          label: __('Size'),
          value: sizeSlug || DEFAULT_SIZE_SLUG,
          onChangeValue: function onChangeValue(newValue) {
            return _this2.onSetSizeSlug(newValue);
          },
          options: sizeOptions
        }), createElement(TextControl, {
          icon: textColor,
          label: __('Alt Text'),
          value: alt || '',
          valuePlaceholder: __('None'),
          onChangeValue: _this2.updateAlt
        })));
      };

      if (!url) {
        return createElement(View, {
          style: {
            flex: 1
          }
        }, createElement(MediaPlaceholder, {
          allowedTypes: [MEDIA_TYPE_IMAGE],
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
      var imageContainerHeight = Dimensions.get('window').width / IMAGE_ASPECT_RATIO;

      var editImageComponent = function editImageComponent(_ref3) {
        var open = _ref3.open,
            mediaOptions = _ref3.mediaOptions;
        return createElement(TouchableWithoutFeedback, {
          onPress: open
        }, createElement(View, {
          style: styles.editContainer
        }, createElement(View, {
          style: styles.edit
        }, mediaOptions(), createElement(Icon, _extends({
          size: 16,
          icon: SvgIconCustomize
        }, styles.iconCustomise)))));
      };

      var getImageComponent = function getImageComponent(openMediaOptions, getMediaOptions) {
        return createElement(TouchableWithoutFeedback, {
          accessible: !isSelected,
          onPress: _this2.onImagePressed,
          onLongPress: openMediaOptions,
          disabled: !isSelected
        }, createElement(View, {
          style: {
            flex: 1
          }
        }, getInspectorControls(), getMediaOptions(), !_this2.state.isCaptionSelected && getToolbarEditButton(openMediaOptions), createElement(MediaUploadProgress, {
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
            var imageBorderOnSelectedStyle = isSelected && !(isUploadInProgress || isUploadFailed || _this2.state.isCaptionSelected) ? styles.imageBorder : '';
            var iconRetryContainer = createElement(View, {
              style: styles.modalIcon
            }, _this2.getIcon(ICON_TYPE.RETRY));
            return createElement(View, {
              style: {
                flex: 1,
                // only set alignSelf if an image exists because alignSelf causes the placeholder
                // to disappear when an aligned image can't be downloaded
                // https://github.com/wordpress-mobile/gutenberg-mobile/issues/1592
                alignSelf: imageWidthWithinContainer && alignToFlex[align]
              }
            }, !imageWidthWithinContainer && createElement(View, {
              style: [_this2.props.getStylesFromColorScheme(styles.imageContainerUpload, styles.imageContainerUploadDark), {
                height: imageContainerHeight
              }]
            }, createElement(View, {
              style: styles.imageUploadingIconContainer
            }, _this2.getIcon(ICON_TYPE.UPLOAD))), createElement(ImageBackground, {
              accessible: true,
              disabled: !isSelected,
              accessibilityLabel: alt,
              accessibilityHint: __('Double tap and hold to edit'),
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
            }, isUploadFailed && createElement(View, {
              style: [styles.imageContainer, {
                flex: 1,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }]
            }, iconRetryContainer, createElement(Text, {
              style: styles.uploadFailedText
            }, retryMessage)), isSelected && !isUploadInProgress && !isUploadFailed && finalWidth && finalHeight && createElement(MediaEdit, {
              allowedTypes: [MEDIA_TYPE_IMAGE],
              onSelect: _this2.onSelectMediaUploadOption,
              source: {
                uri: url
              },
              openReplaceMediaOptions: openMediaOptions,
              render: editImageComponent
            })));
          }
        }), createElement(BlockCaption, {
          clientId: _this2.props.clientId,
          isSelected: _this2.state.isCaptionSelected,
          accessible: true,
          accessibilityLabelCreator: function accessibilityLabelCreator(caption) {
            return isEmpty(caption) ?
            /* translators: accessibility text. Empty image caption. */
            'Image caption. Empty' : sprintf(
            /* translators: accessibility text. %s: image caption. */
            __('Image caption. %s'), caption);
          },
          onFocus: _this2.onFocusCaption,
          onBlur: _this2.props.onBlur // always assign onBlur as props

        })));
      };

      return createElement(MediaUpload, {
        allowedTypes: [MEDIA_TYPE_IMAGE],
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
}(React.Component);
export default compose([withSelect(function (select, props) {
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

  var shouldGetMedia = id && isSelected && getProtocol(url) !== 'file:';
  return {
    image: shouldGetMedia ? getMedia(id) : null,
    imageSizes: imageSizes
  };
}), withPreferredColorScheme])(ImageEdit);
//# sourceMappingURL=edit.native.js.map