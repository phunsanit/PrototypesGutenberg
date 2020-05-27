import _extends from "@babel/runtime/helpers/esm/extends";
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
import { View, ImageBackground, Text, TouchableWithoutFeedback } from 'react-native';
import { mediaUploadSync, requestImageFailedRetryDialog, requestImageUploadCancelDialog } from 'react-native-gutenberg-bridge';
/**
 * WordPress dependencies
 */

import { Icon, Button, ToolbarGroup, withNotices } from '@wordpress/components';
import { BlockControls, MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO, MediaPlaceholder, MediaUpload, MediaUploadProgress, VIDEO_ASPECT_RATIO, VideoPlayer } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { isURL, getProtocol } from '@wordpress/url';
import { compose, withPreferredColorScheme } from '@wordpress/compose';
import { replace } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import styles from './style.scss';
import icon from './media-container-icon';
import SvgIconRetry from './icon-retry';
/**
 * Constants
 */

var ALLOWED_MEDIA_TYPES = [MEDIA_TYPE_IMAGE, MEDIA_TYPE_VIDEO];
export { imageFillStyles } from './media-container.js';

var MediaContainer = /*#__PURE__*/function (_Component) {
  _inherits(MediaContainer, _Component);

  var _super = _createSuper(MediaContainer);

  function MediaContainer() {
    var _this;

    _classCallCheck(this, MediaContainer);

    _this = _super.apply(this, arguments);
    _this.onUploadError = _this.onUploadError.bind(_assertThisInitialized(_this));
    _this.updateMediaProgress = _this.updateMediaProgress.bind(_assertThisInitialized(_this));
    _this.finishMediaUploadWithSuccess = _this.finishMediaUploadWithSuccess.bind(_assertThisInitialized(_this));
    _this.finishMediaUploadWithFailure = _this.finishMediaUploadWithFailure.bind(_assertThisInitialized(_this));
    _this.mediaUploadStateReset = _this.mediaUploadStateReset.bind(_assertThisInitialized(_this));
    _this.onSelectMediaUploadOption = _this.onSelectMediaUploadOption.bind(_assertThisInitialized(_this));
    _this.onMediaPressed = _this.onMediaPressed.bind(_assertThisInitialized(_this));
    _this.state = {
      isUploadInProgress: false
    };
    return _this;
  }

  _createClass(MediaContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          mediaId = _this$props.mediaId,
          mediaUrl = _this$props.mediaUrl; // Make sure we mark any temporary images as failed if they failed while
      // the editor wasn't open

      if (mediaId && mediaUrl && getProtocol(mediaUrl) === 'file:') {
        mediaUploadSync();
      }
    }
  }, {
    key: "onUploadError",
    value: function onUploadError(message) {
      var noticeOperations = this.props.noticeOperations;
      noticeOperations.removeAllNotices();
      noticeOperations.createErrorNotice(message);
    }
  }, {
    key: "onSelectMediaUploadOption",
    value: function onSelectMediaUploadOption(params) {
      var id = params.id,
          url = params.url,
          type = params.type;
      var onSelectMedia = this.props.onSelectMedia;
      onSelectMedia({
        media_type: type,
        id: id,
        url: url
      });
    }
  }, {
    key: "onMediaPressed",
    value: function onMediaPressed() {
      var _this$props2 = this.props,
          mediaId = _this$props2.mediaId,
          mediaUrl = _this$props2.mediaUrl;

      if (this.state.isUploadInProgress) {
        requestImageUploadCancelDialog(mediaId);
      } else if (mediaId && getProtocol(mediaUrl) === 'file:') {
        requestImageFailedRetryDialog(mediaId);
      }
    }
  }, {
    key: "getIcon",
    value: function getIcon(isRetryIcon, isVideo) {
      if (isRetryIcon) {
        return createElement(Icon, _extends({
          icon: SvgIconRetry
        }, (styles.iconRetry, isVideo ? styles.iconRetryVideo : {})));
      }

      var iconStyle = this.props.getStylesFromColorScheme(styles.icon, styles.iconDark);
      return createElement(Icon, _extends({
        icon: icon
      }, iconStyle));
    }
  }, {
    key: "renderToolbarEditButton",
    value: function renderToolbarEditButton(open) {
      return createElement(BlockControls, null, createElement(ToolbarGroup, null, createElement(Button, {
        className: "components-toolbar__control",
        label: __('Edit media'),
        icon: replace,
        onClick: open
      })));
    }
  }, {
    key: "updateMediaProgress",
    value: function updateMediaProgress() {
      if (!this.state.isUploadInProgress) {
        this.setState({
          isUploadInProgress: true
        });
      }
    }
  }, {
    key: "finishMediaUploadWithSuccess",
    value: function finishMediaUploadWithSuccess(payload) {
      var onMediaUpdate = this.props.onMediaUpdate;
      onMediaUpdate({
        id: payload.mediaServerId,
        url: payload.mediaUrl
      });
      this.setState({
        isUploadInProgress: false
      });
    }
  }, {
    key: "finishMediaUploadWithFailure",
    value: function finishMediaUploadWithFailure() {
      this.setState({
        isUploadInProgress: false
      });
    }
  }, {
    key: "mediaUploadStateReset",
    value: function mediaUploadStateReset() {
      var onMediaUpdate = this.props.onMediaUpdate;
      onMediaUpdate({
        id: null,
        url: null
      });
      this.setState({
        isUploadInProgress: false
      });
    }
  }, {
    key: "renderImage",
    value: function renderImage(params, openMediaOptions) {
      var isUploadInProgress = this.state.isUploadInProgress;
      var _this$props3 = this.props,
          mediaAlt = _this$props3.mediaAlt,
          mediaUrl = _this$props3.mediaUrl,
          isSelected = _this$props3.isSelected;
      var finalWidth = params.finalWidth,
          finalHeight = params.finalHeight,
          imageWidthWithinContainer = params.imageWidthWithinContainer,
          isUploadFailed = params.isUploadFailed,
          retryMessage = params.retryMessage;
      var opacity = isUploadInProgress ? 0.3 : 1;
      var contentStyle = !imageWidthWithinContainer ? styles.content : styles.contentCentered;
      return createElement(TouchableWithoutFeedback, {
        accessible: !isSelected,
        onPress: this.onMediaPressed,
        onLongPress: openMediaOptions,
        disabled: !isSelected
      }, createElement(View, {
        style: contentStyle
      }, !imageWidthWithinContainer && createElement(View, {
        style: styles.imageContainer
      }, this.getIcon(false)), createElement(ImageBackground, {
        accessible: true,
        accessibilityLabel: mediaAlt,
        accessibilityHint: __('Double tap and hold to edit'),
        accessibilityRole: 'imagebutton',
        style: {
          width: finalWidth,
          height: finalHeight,
          opacity: opacity
        },
        resizeMethod: "scale",
        source: {
          uri: mediaUrl
        },
        key: mediaUrl
      }, isUploadFailed && createElement(View, {
        style: [styles.imageContainer, styles.uploadFailed]
      }, createElement(View, {
        style: styles.modalIcon
      }, this.getIcon(isUploadFailed)), createElement(Text, {
        style: styles.uploadFailedText
      }, retryMessage)))));
    }
  }, {
    key: "renderVideo",
    value: function renderVideo(params, openMediaOptions) {
      var _this$props4 = this.props,
          mediaUrl = _this$props4.mediaUrl,
          isSelected = _this$props4.isSelected;
      var isUploadInProgress = this.state.isUploadInProgress;
      var isUploadFailed = params.isUploadFailed,
          retryMessage = params.retryMessage;
      var showVideo = isURL(mediaUrl) && !isUploadInProgress && !isUploadFailed;
      return createElement(TouchableWithoutFeedback, {
        accessible: !isSelected,
        onPress: this.onMediaPressed,
        onLongPress: openMediaOptions,
        disabled: !isSelected
      }, createElement(View, {
        aspectRatio: VIDEO_ASPECT_RATIO
      }, showVideo && createElement(View, {
        style: styles.videoContainer
      }, createElement(VideoPlayer, {
        isSelected: isSelected,
        style: styles.video,
        source: {
          uri: mediaUrl
        },
        paused: true
      })), !showVideo && createElement(View, {
        style: styles.videoPlaceholder
      }, createElement(View, {
        style: styles.modalIcon
      }, isUploadFailed ? this.getIcon(isUploadFailed) : this.getIcon(false)), isUploadFailed && createElement(Text, {
        style: [styles.uploadFailedText, styles.uploadFailedTextVideo]
      }, retryMessage))));
    }
  }, {
    key: "renderContent",
    value: function renderContent(params, openMediaOptions) {
      var mediaType = this.props.mediaType;
      var mediaElement = null;

      switch (mediaType) {
        case MEDIA_TYPE_IMAGE:
          mediaElement = this.renderImage(params, openMediaOptions);
          break;

        case MEDIA_TYPE_VIDEO:
          mediaElement = this.renderVideo(params, openMediaOptions);
          break;
      }

      return mediaElement;
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      return createElement(MediaPlaceholder, {
        icon: this.getIcon(false),
        labels: {
          title: __('Media area')
        },
        onSelect: this.onSelectMediaUploadOption,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        onFocus: this.props.onFocus,
        onError: this.onUploadError
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props5 = this.props,
          mediaUrl = _this$props5.mediaUrl,
          mediaId = _this$props5.mediaId,
          mediaType = _this$props5.mediaType;
      var coverUrl = mediaType === MEDIA_TYPE_IMAGE ? mediaUrl : null;

      if (mediaUrl) {
        return createElement(View, null, createElement(MediaUpload, {
          onSelect: this.onSelectMediaUploadOption,
          allowedTypes: ALLOWED_MEDIA_TYPES,
          value: mediaId,
          render: function render(_ref) {
            var open = _ref.open,
                getMediaOptions = _ref.getMediaOptions;
            return createElement(View, {
              style: {
                flex: 1
              }
            }, getMediaOptions(), _this2.renderToolbarEditButton(open), createElement(MediaUploadProgress, {
              coverUrl: coverUrl,
              mediaId: mediaId,
              onUpdateMediaProgress: _this2.updateMediaProgress,
              onFinishMediaUploadWithSuccess: _this2.finishMediaUploadWithSuccess,
              onFinishMediaUploadWithFailure: _this2.finishMediaUploadWithFailure,
              onMediaUploadStateReset: _this2.mediaUploadStateReset,
              renderContent: function renderContent(params) {
                return createElement(View, {
                  style: styles.content
                }, _this2.renderContent(params, open));
              }
            }));
          }
        }));
      }

      return this.renderPlaceholder();
    }
  }]);

  return MediaContainer;
}(Component);

export default compose(withNotices, withPreferredColorScheme)(MediaContainer);
//# sourceMappingURL=media-container.native.js.map