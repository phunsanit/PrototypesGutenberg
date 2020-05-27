"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.imageFillStyles = imageFillStyles;
exports.default = void 0;

var _element = require("@wordpress/element");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _components = require("@wordpress/components");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _mediaContainerIcon = _interopRequireDefault(require("./media-container-icon"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Constants
 */
var ALLOWED_MEDIA_TYPES = ['image', 'video'];

function imageFillStyles(url, focalPoint) {
  return url ? {
    backgroundImage: "url(".concat(url, ")"),
    backgroundPosition: focalPoint ? "".concat(focalPoint.x * 100, "% ").concat(focalPoint.y * 100, "%") : "50% 50%"
  } : {};
}

function ResizableBoxContainer(_ref) {
  var isSelected = _ref.isSelected,
      isStackedOnMobile = _ref.isStackedOnMobile,
      props = (0, _objectWithoutProperties2.default)(_ref, ["isSelected", "isStackedOnMobile"]);
  var isMobile = (0, _compose.useViewportMatch)('small', '<');
  return (0, _element.createElement)(_components.ResizableBox, (0, _extends2.default)({
    showHandle: isSelected && (!isMobile || !isStackedOnMobile)
  }, props));
}

var MediaContainer = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MediaContainer, _Component);

  var _super = _createSuper(MediaContainer);

  function MediaContainer() {
    var _this;

    (0, _classCallCheck2.default)(this, MediaContainer);
    _this = _super.apply(this, arguments);
    _this.onUploadError = _this.onUploadError.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(MediaContainer, [{
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
      return (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.MediaReplaceFlow, {
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
      return (0, _element.createElement)(_element.Fragment, null, this.renderToolbarEditButton(), (0, _element.createElement)("figure", {
        className: className,
        style: backgroundStyles
      }, (0, _element.createElement)("img", {
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
      return (0, _element.createElement)(_element.Fragment, null, this.renderToolbarEditButton(), (0, _element.createElement)("figure", {
        className: className
      }, (0, _element.createElement)("video", {
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
      return (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
        icon: (0, _element.createElement)(_blockEditor.BlockIcon, {
          icon: _mediaContainerIcon.default
        }),
        labels: {
          title: (0, _i18n.__)('Media area')
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

        return (0, _element.createElement)(ResizableBoxContainer, {
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
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withDispatch)(function (dispatch) {
  var _dispatch = dispatch('core/block-editor'),
      toggleSelection = _dispatch.toggleSelection;

  return {
    toggleSelection: toggleSelection
  };
}), _components.withNotices])(MediaContainer);

exports.default = _default;
//# sourceMappingURL=media-container.js.map