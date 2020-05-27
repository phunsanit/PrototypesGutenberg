import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * External dependencies
 */
import { View, TouchableWithoutFeedback } from 'react-native';
import { requestImageFailedRetryDialog, requestImageUploadCancelDialog, mediaUploadSync } from 'react-native-gutenberg-bridge';
import Video from 'react-native-video';
/**
 * WordPress dependencies
 */

import { __ } from '@wordpress/i18n';
import { Icon, ImageWithFocalPoint, PanelBody, RangeControl, ToolbarButton, ToolbarGroup, Gradient } from '@wordpress/components';
import { BlockControls, InnerBlocks, InspectorControls, MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO, MediaPlaceholder, MediaUpload, MediaUploadProgress, withColors, __experimentalUseGradient } from '@wordpress/block-editor';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { cover as icon, replace } from '@wordpress/icons';
import { getProtocol } from '@wordpress/url';
/**
 * Internal dependencies
 */

import styles from './style.scss';
import { attributesFromMedia, COVER_MIN_HEIGHT, IMAGE_BACKGROUND_TYPE, VIDEO_BACKGROUND_TYPE } from './shared';
import OverlayColorSettings from './overlay-color-settings';
/**
 * Constants
 */

var ALLOWED_MEDIA_TYPES = [MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO];
var INNER_BLOCKS_TEMPLATE = [['core/paragraph', {
  align: 'center',
  placeholder: __('Write title…')
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

  var _experimentalUseGrad = __experimentalUseGradient(),
      gradientValue = _experimentalUseGrad.gradientValue;

  var hasBackground = !!(url || style && style.color && style.color.background || attributes.overlayColor || overlayColor.color || gradientValue); // Used to set a default color for its InnerBlocks
  // since there's no system to inherit styles yet
  // the RichText component will check if there are
  // parent styles for the current block. If there are,
  // it will use that color instead.

  useEffect(function () {
    // While we don't support theme colors
    if (!attributes.overlayColor || !attributes.overlay && url) {
      setAttributes({
        childrenStyles: styles.defaultColor
      });
    }
  }, [setAttributes]); // sync with local media store

  useEffect(mediaUploadSync, []); // initialize uploading flag to false, awaiting sync

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isUploadInProgress = _useState2[0],
      setIsUploadInProgress = _useState2[1]; // initialize upload failure flag to true if url is local


  var _useState3 = useState(id && getProtocol(url) === 'file:'),
      _useState4 = _slicedToArray(_useState3, 2),
      didUploadFail = _useState4[0],
      setDidUploadFail = _useState4[1]; // don't show failure if upload is in progress


  var shouldShowFailure = didUploadFail && !isUploadInProgress;

  var onSelectMedia = function onSelectMedia(media) {
    setDidUploadFail(false);
    var onSelect = attributesFromMedia(setAttributes); // Remove gradient attribute

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
      requestImageUploadCancelDialog(id);
    } else if (shouldShowFailure) {
      requestImageFailedRetryDialog(id);
    }
  };

  var _useState5 = useState(true),
      _useState6 = _slicedToArray(_useState5, 2),
      isVideoLoading = _useState6[0],
      setIsVideoLoading = _useState6[1];

  var onVideoLoadStart = function onVideoLoadStart() {
    setIsVideoLoading(true);
  };

  var onVideoLoad = function onVideoLoad() {
    setIsVideoLoading(false);
  };

  var backgroundColor = getStylesFromColorScheme(styles.backgroundSolid, styles.backgroundSolidDark);
  var overlayStyles = [styles.overlay, url && {
    opacity: dimRatio / 100
  }, !gradientValue && {
    backgroundColor: customOverlayColor || (overlayColor === null || overlayColor === void 0 ? void 0 : overlayColor.color) || (style === null || style === void 0 ? void 0 : (_style$color = style.color) === null || _style$color === void 0 ? void 0 : _style$color.background) || styles.overlay.color
  }, // While we don't support theme colors we add a default bg color
  !overlayColor.color && !url ? backgroundColor : {}];
  var placeholderIconStyle = getStylesFromColorScheme(styles.icon, styles.iconDark);
  var placeholderIcon = createElement(Icon, _extends({
    icon: icon
  }, placeholderIconStyle));

  var toolbarControls = function toolbarControls(open) {
    return createElement(BlockControls, null, createElement(ToolbarGroup, null, createElement(ToolbarButton, {
      title: __('Edit cover media'),
      icon: replace,
      onClick: open
    })));
  };

  var controls = createElement(InspectorControls, null, createElement(OverlayColorSettings, {
    attributes: attributes,
    setAttributes: setAttributes
  }), createElement(PanelBody, {
    title: __('Dimensions')
  }, createElement(RangeControl, {
    label: __('Minimum height in pixels'),
    minimumValue: COVER_MIN_HEIGHT,
    maximumValue: COVER_MAX_HEIGHT,
    value: CONTAINER_HEIGHT,
    onChange: onHeightChange,
    style: styles.rangeCellContainer
  })), url ? createElement(PanelBody, {
    title: __('Overlay')
  }, createElement(RangeControl, {
    label: __('Background Opacity'),
    minimumValue: 0,
    maximumValue: 100,
    value: dimRatio,
    onChange: onOpactiyChange,
    style: styles.rangeCellContainer
  })) : null);

  var renderBackground = function renderBackground(_ref2) {
    var openMediaOptions = _ref2.open,
        getMediaOptions = _ref2.getMediaOptions;
    return createElement(TouchableWithoutFeedback, {
      accessible: !isParentSelected,
      onPress: onMediaPressed,
      onLongPress: openMediaOptions,
      disabled: !isParentSelected
    }, createElement(View, {
      style: [styles.background, backgroundColor]
    }, getMediaOptions(), isParentSelected && toolbarControls(openMediaOptions), createElement(MediaUploadProgress, {
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
    }), IMAGE_BACKGROUND_TYPE === backgroundType && createElement(ImageWithFocalPoint, {
      focalPoint: focalPoint,
      url: url
    }), VIDEO_BACKGROUND_TYPE === backgroundType && createElement(Video, {
      muted: true,
      disableFocus: true,
      repeat: true,
      resizeMode: 'cover',
      source: {
        uri: url
      },
      onLoad: onVideoLoad,
      onLoadStart: onVideoLoadStart,
      style: [styles.background, // Hide Video component since it has black background while loading the source
      {
        opacity: isVideoLoading ? 0 : 1
      }]
    })));
  };

  if (!hasBackground) {
    return createElement(View, null, createElement(MediaPlaceholder, {
      icon: placeholderIcon,
      labels: {
        title: __('Cover')
      },
      onSelect: onSelectMedia,
      allowedTypes: ALLOWED_MEDIA_TYPES,
      onFocus: onFocus
    }));
  }

  return createElement(View, {
    style: styles.backgroundContainer
  }, controls, createElement(View, {
    pointerEvents: "box-none",
    style: [styles.content, {
      minHeight: CONTAINER_HEIGHT
    }]
  }, createElement(InnerBlocks, {
    template: INNER_BLOCKS_TEMPLATE
  })), createElement(View, {
    pointerEvents: "none",
    style: overlayStyles
  }, gradientValue && createElement(Gradient, {
    gradientValue: gradientValue,
    style: styles.background
  })), createElement(MediaUpload, {
    allowedTypes: ALLOWED_MEDIA_TYPES,
    onSelect: onSelectMedia,
    render: renderBackground
  }), shouldShowFailure && createElement(View, {
    pointerEvents: "none",
    style: styles.uploadFailedContainer
  }, createElement(View, {
    style: styles.uploadFailed
  }, createElement(Icon, _extends({
    icon: 'warning'
  }, styles.uploadFailedIcon)))));
};

export default compose([withColors({
  overlayColor: 'background-color'
}), withSelect(function (select, _ref4) {
  var clientId = _ref4.clientId;

  var _select = select('core/block-editor'),
      getSelectedBlockClientId = _select.getSelectedBlockClientId;

  var selectedBlockClientId = getSelectedBlockClientId();
  return {
    isParentSelected: selectedBlockClientId === clientId
  };
}), withPreferredColorScheme])(Cover);
//# sourceMappingURL=edit.native.js.map