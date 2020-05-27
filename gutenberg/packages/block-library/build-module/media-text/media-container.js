import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import { createElement, Fragment } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * WordPress dependencies
 */
import { ResizableBox, withNotices } from '@wordpress/components';
import { BlockControls, BlockIcon, MediaPlaceholder, MediaReplaceFlow } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { compose, useViewportMatch } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */

import icon from './media-container-icon';
/**
 * Constants
 */

var ALLOWED_MEDIA_TYPES = ['image', 'video'];
export function imageFillStyles(url, focalPoint) {
  return url ? {
    backgroundImage: "url(".concat(url, ")"),
    backgroundPosition: focalPoint ? "".concat(focalPoint.x * 100, "% ").concat(focalPoint.y * 100, "%") : "50% 50%"
  } : {};
}

function ResizableBoxContainer(_ref) {
  var isSelected = _ref.isSelected,
      isStackedOnMobile = _ref.isStackedOnMobile,
      props = _objectWithoutProperties(_ref, ["isSelected", "isStackedOnMobile"]);

  var isMobile = useViewportMatch('small', '<');
  return createElement(ResizableBox, _extends({
    showHandle: isSelected && (!isMobile || !isStackedOnMobile)
  }, props));
}

var MediaContainer = /*#__PURE__*/function (_Component) {
  _inherits(MediaContainer, _Component);

  var _super = _createSuper(MediaContainer);

  function MediaContainer() {
    var _this;

    _classCallCheck(this, MediaContainer);

    _this = _super.apply(this, arguments);
    _this.onUploadError = _this.onUploadError.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MediaContainer, [{
    key: "onUploadError",
    value: function onUploadError(message) {
      var noticeOperations = this.props.noticeOperations;
      noticeOperations.removeAllNotices();
      noticeOperations.createErrorNotice(message);
    }
  }, {
    key: "renderToolbarEditButton",
    value: function renderToolbarEditButton() {
      var _this$props = this.props,
          onSelectMedia = _this$props.onSelectMedia,
          mediaUrl = _this$props.mediaUrl,
          mediaId = _this$props.mediaId;
      return createElement(BlockControls, null, createElement(MediaReplaceFlow, {
        mediaId: mediaId,
        mediaURL: mediaUrl,
        allowedTypes: ALLOWED_MEDIA_TYPES,
        accept: "image/*,video/*",
        onSelect: onSelectMedia
      }));
    }
  }, {
    key: "renderImage",
    value: function renderImage() {
      var _this$props2 = this.props,
          mediaAlt = _this$props2.mediaAlt,
          mediaUrl = _this$props2.mediaUrl,
          className = _this$props2.className,
          imageFill = _this$props2.imageFill,
          focalPoint = _this$props2.focalPoint;
      var backgroundStyles = imageFill ? imageFillStyles(mediaUrl, focalPoint) : {};
      return createElement(Fragment, null, this.renderToolbarEditButton(), createElement("figure", {
        className: className,
        style: backgroundStyles
      }, createElement("img", {
        src: mediaUrl,
        alt: mediaAlt
      })));
    }
  }, {
    key: "renderVideo",
    value: function renderVideo() {
      var _this$props3 = this.props,
          mediaUrl = _this$props3.mediaUrl,
          className = _this$props3.className;
      return createElement(Fragment, null, this.renderToolbarEditButton(), createElement("figure", {
        className: className
      }, createElement("video", {
        controls: true,
        src: mediaUrl
      })));
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder() {
      var _this$props4 = this.props,
          onSelectMedia = _this$props4.onSelectMedia,
          className = _this$props4.className,
          noticeUI = _this$props4.noticeUI;
      return createElement(MediaPlaceholder, {
        icon: createElement(BlockIcon, {
          icon: icon
        }),
        labels: {
          title: __('Media area')
        },
        className: className,
        onSelect: onSelectMedia,
        accept: "image/*,video/*",
        allowedTypes: ALLOWED_MEDIA_TYPES,
        notices: noticeUI,
        onError: this.onUploadError
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          mediaPosition = _this$props5.mediaPosition,
          mediaUrl = _this$props5.mediaUrl,
          mediaType = _this$props5.mediaType,
          mediaWidth = _this$props5.mediaWidth,
          commitWidthChange = _this$props5.commitWidthChange,
          onWidthChange = _this$props5.onWidthChange,
          toggleSelection = _this$props5.toggleSelection,
          isSelected = _this$props5.isSelected,
          isStackedOnMobile = _this$props5.isStackedOnMobile;

      if (mediaType && mediaUrl) {
        var onResizeStart = function onResizeStart() {
          toggleSelection(false);
        };

        var onResize = function onResize(event, direction, elt) {
          onWidthChange(parseInt(elt.style.width));
        };

        var onResizeStop = function onResizeStop(event, direction, elt) {
          toggleSelection(true);
          commitWidthChange(parseInt(elt.style.width));
        };

        var enablePositions = {
          right: mediaPosition === 'left',
          left: mediaPosition === 'right'
        };
        var mediaElement = null;

        switch (mediaType) {
          case 'image':
            mediaElement = this.renderImage();
            break;

          case 'video':
            mediaElement = this.renderVideo();
            break;
        }

        return createElement(ResizableBoxContainer, {
          className: "editor-media-container__resizer",
          size: {
            width: mediaWidth + '%'
          },
          minWidth: "10%",
          maxWidth: "100%",
          enable: enablePositions,
          onResizeStart: onResizeStart,
          onResize: onResize,
          onResizeStop: onResizeStop,
          axis: "x",
          isSelected: isSelected,
          isStackedOnMobile: isStackedOnMobile
        }, mediaElement);
      }

      return this.renderPlaceholder();
    }
  }]);

  return MediaContainer;
}(Component);

export default compose([withDispatch(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      toggleSelection = _dispatch.toggleSelection;

  return {
    toggleSelection: toggleSelection
  };
}), withNotices])(MediaContainer);
//# sourceMappingURL=media-container.js.map