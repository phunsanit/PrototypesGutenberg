"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _reactNative = require("react-native");

var _reactNativeGutenbergBridge = require("react-native-gutenberg-bridge");

var _reactNativeVideo = _interopRequireDefault(require("react-native-video"));

var _i18n = require("@wordpress/i18n");

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _icons = require("@wordpress/icons");

var _url = require("@wordpress/url");

var _style = _interopRequireDefault(require("./style.scss"));

var _shared = require("./shared");

var _overlayColorSettings = _interopRequireDefault(require("./overlay-color-settings"));

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */

/**
 * Constants
 */
var ALLOWED_MEDIA_TYPES = [_blockEditor.MEDIA_TYPE_IMAGE, _blockEditor.MEDIA_TYPE_VIDEO];
var INNER_BLOCKS_TEMPLATE = [['core/paragraph', {
  align: 'center',
  placeholder: (0, _i18n.__)('Write title…')
}]];
var COVER_MAX_HEIGHT = 1000;
var COVER_DEFAULT_HEIGHT = 300;

var Cover = function Cover(_ref) {
  var _style$color;

  var attributes = _ref.attributes,
      getStylesFromColorScheme = _ref.getStylesFromColorScheme,
      isParentSelected = _ref.isParentSelected,
      onFocus = _ref.onFocus,
      overlayColor = _ref.overlayColor,
      setAttributes = _ref.setAttributes;
  var backgroundType = attributes.backgroundType,
      dimRatio = attributes.dimRatio,
      focalPoint = attributes.focalPoint,
      minHeight = attributes.minHeight,
      url = attributes.url,
      id = attributes.id,
      style = attributes.style,
      customOverlayColor = attributes.customOverlayColor;
  var CONTAINER_HEIGHT = minHeight || COVER_DEFAULT_HEIGHT;

  var _experimentalUseGrad = (0, _blockEditor.__experimentalUseGradient)(),
      gradientValue = _experimentalUseGrad.gradientValue;

  var hasBackground = !!(url || style && style.color && style.color.background || attributes.overlayColor || overlayColor.color || gradientValue); // Used to set a default color for its InnerBlocks
  // since there's no system to inherit styles yet
  // the RichText component will check if there are
  // parent styles for the current block. If there are,
  // it will use that color instead.

  (0, _element.useEffect)(function () {
    // While we don't support theme colors
    if (!attributes.overlayColor || !attributes.overlay && url) {
      setAttributes({
        childrenStyles: _style.default.defaultColor
      });
    }
  }, [setAttributes]); // sync with local media store

  (0, _element.useEffect)(_reactNativeGutenbergBridge.mediaUploadSync, []); // initialize uploading flag to false, awaiting sync

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isUploadInProgress = _useState2[0],
      setIsUploadInProgress = _useState2[1]; // initialize upload failure flag to true if url is local


  var _useState3 = (0, _element.useState)(id && (0, _url.getProtocol)(url) === 'file:'),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      didUploadFail = _useState4[0],
      setDidUploadFail = _useState4[1]; // don't show failure if upload is in progress


  var shouldShowFailure = didUploadFail && !isUploadInProgress;

  var onSelectMedia = function onSelectMedia(media) {
    setDidUploadFail(false);
    var onSelect = (0, _shared.attributesFromMedia)(setAttributes); // Remove gradient attribute

    setAttributes({
      gradient: undefined,
      customGradient: undefined
    });
    onSelect(media);
  };

  var onHeightChange = function onHeightChange(value) {
    if (minHeight || value !== COVER_DEFAULT_HEIGHT) {
      setAttributes({
        minHeight: value
      });
    }
  };

  var onOpactiyChange = function onOpactiyChange(value) {
    setAttributes({
      dimRatio: value
    });
  };

  var onMediaPressed = function onMediaPressed() {
    if (isUploadInProgress) {
      (0, _reactNativeGutenbergBridge.requestImageUploadCancelDialog)(id);
    } else if (shouldShowFailure) {
      (0, _reactNativeGutenbergBridge.requestImageFailedRetryDialog)(id);
    }
  };

  var _useState5 = (0, _element.useState)(true),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isVideoLoading = _useState6[0],
      setIsVideoLoading = _useState6[1];

  var onVideoLoadStart = function onVideoLoadStart() {
    setIsVideoLoading(true);
  };

  var onVideoLoad = function onVideoLoad() {
    setIsVideoLoading(false);
  };

  var backgroundColor = getStylesFromColorScheme(_style.default.backgroundSolid, _style.default.backgroundSolidDark);
  var overlayStyles = [_style.default.overlay, url && {
    opacity: dimRatio / 100
  }, !gradientValue && {
    backgroundColor: customOverlayColor || (overlayColor === null || overlayColor === void 0 ? void 0 : overlayColor.color) || (style === null || style === void 0 ? void 0 : (_style$color = style.color) === null || _style$color === void 0 ? void 0 : _style$color.background) || _style.default.overlay.color
  }, // While we don't support theme colors we add a default bg color
  !overlayColor.color && !url ? backgroundColor : {}];
  var placeholderIconStyle = getStylesFromColorScheme(_style.default.icon, _style.default.iconDark);
  var placeholderIcon = (0, _element.createElement)(_components.Icon, (0, _extends2.default)({
    icon: _icons.cover
  }, placeholderIconStyle));

  var toolbarControls = function toolbarControls(open) {
    return (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.ToolbarGroup, null, (0, _element.createElement)(_components.ToolbarButton, {
      title: (0, _i18n.__)('Edit cover media'),
      icon: _icons.replace,
      onClick: open
    })));
  };

  var controls = (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_overlayColorSettings.default, {
    attributes: attributes,
    setAttributes: setAttributes
  }), (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Dimensions')
  }, (0, _element.createElement)(_components.RangeControl, {
    label: (0, _i18n.__)('Minimum height in pixels'),
    minimumValue: _shared.COVER_MIN_HEIGHT,
    maximumValue: COVER_MAX_HEIGHT,
    value: CONTAINER_HEIGHT,
    onChange: onHeightChange,
    style: _style.default.rangeCellContainer
  })), url ? (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Overlay')
  }, (0, _element.createElement)(_components.RangeControl, {
    label: (0, _i18n.__)('Background Opacity'),
    minimumValue: 0,
    maximumValue: 100,
    value: dimRatio,
    onChange: onOpactiyChange,
    style: _style.default.rangeCellContainer
  })) : null);

  var renderBackground = function renderBackground(_ref2) {
    var openMediaOptions = _ref2.open,
        getMediaOptions = _ref2.getMediaOptions;
    return (0, _element.createElement)(_reactNative.TouchableWithoutFeedback, {
      accessible: !isParentSelected,
      onPress: onMediaPressed,
      onLongPress: openMediaOptions,
      disabled: !isParentSelected
    }, (0, _element.createElement)(_reactNative.View, {
      style: [_style.default.background, backgroundColor]
    }, getMediaOptions(), isParentSelected && toolbarControls(openMediaOptions), (0, _element.createElement)(_blockEditor.MediaUploadProgress, {
      mediaId: id,
      onUpdateMediaProgress: function onUpdateMediaProgress() {
        setIsUploadInProgress(true);
      },
      onFinishMediaUploadWithSuccess: function onFinishMediaUploadWithSuccess(_ref3) {
        var mediaServerId = _ref3.mediaServerId,
            mediaUrl = _ref3.mediaUrl;
        setIsUploadInProgress(false);
        setDidUploadFail(false);
        setAttributes({
          id: mediaServerId,
          url: mediaUrl,
          backgroundType: backgroundType
        });
      },
      onFinishMediaUploadWithFailure: function onFinishMediaUploadWithFailure() {
        setIsUploadInProgress(false);
        setDidUploadFail(true);
      },
      onMediaUploadStateReset: function onMediaUploadStateReset() {
        setIsUploadInProgress(false);
        setDidUploadFail(false);
        setAttributes({
          id: undefined,
          url: undefined
        });
      }
    }), _shared.IMAGE_BACKGROUND_TYPE === backgroundType && (0, _element.createElement)(_components.ImageWithFocalPoint, {
      focalPoint: focalPoint,
      url: url
    }), _shared.VIDEO_BACKGROUND_TYPE === backgroundType && (0, _element.createElement)(_reactNativeVideo.default, {
      muted: true,
      disableFocus: true,
      repeat: true,
      resizeMode: 'cover',
      source: {
        uri: url
      },
      onLoad: onVideoLoad,
      onLoadStart: onVideoLoadStart,
      style: [_style.default.background, // Hide Video component since it has black background while loading the source
      {
        opacity: isVideoLoading ? 0 : 1
      }]
    })));
  };

  if (!hasBackground) {
    return (0, _element.createElement)(_reactNative.View, null, (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
      icon: placeholderIcon,
      labels: {
        title: (0, _i18n.__)('Cover')
      },
      onSelect: onSelectMedia,
      allowedTypes: ALLOWED_MEDIA_TYPES,
      onFocus: onFocus
    }));
  }

  return (0, _element.createElement)(_reactNative.View, {
    style: _style.default.backgroundContainer
  }, controls, (0, _element.createElement)(_reactNative.View, {
    pointerEvents: "box-none",
    style: [_style.default.content, {
      minHeight: CONTAINER_HEIGHT
    }]
  }, (0, _element.createElement)(_blockEditor.InnerBlocks, {
    template: INNER_BLOCKS_TEMPLATE
  })), (0, _element.createElement)(_reactNative.View, {
    pointerEvents: "none",
    style: overlayStyles
  }, gradientValue && (0, _element.createElement)(_components.Gradient, {
    gradientValue: gradientValue,
    style: _style.default.background
  })), (0, _element.createElement)(_blockEditor.MediaUpload, {
    allowedTypes: ALLOWED_MEDIA_TYPES,
    onSelect: onSelectMedia,
    render: renderBackground
  }), shouldShowFailure && (0, _element.createElement)(_reactNative.View, {
    pointerEvents: "none",
    style: _style.default.uploadFailedContainer
  }, (0, _element.createElement)(_reactNative.View, {
    style: _style.default.uploadFailed
  }, (0, _element.createElement)(_components.Icon, (0, _extends2.default)({
    icon: 'warning'
  }, _style.default.uploadFailedIcon)))));
};

var _default = (0, _compose.compose)([(0, _blockEditor.withColors)({
  overlayColor: 'background-color'
}), (0, _data.withSelect)(function (select, _ref4) {
  var clientId = _ref4.clientId;

  var _select = select('core/block-editor'),
      getSelectedBlockClientId = _select.getSelectedBlockClientId;

  var selectedBlockClientId = getSelectedBlockClientId();
  return {
    isParentSelected: selectedBlockClientId === clientId
  };
}), _compose.withPreferredColorScheme])(Cover);

exports.default = _default;
//# sourceMappingURL=edit.native.js.map