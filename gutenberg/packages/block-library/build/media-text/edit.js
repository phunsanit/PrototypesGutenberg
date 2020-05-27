"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _icons = require("@wordpress/icons");

var _mediaContainer = _interopRequireDefault(require("./media-container"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * Constants
 */
var TEMPLATE = [['core/paragraph', {
  fontSize: 'large',
  placeholder: (0, _i18n._x)('Content…', 'content placeholder')
}]]; // this limits the resize to a safe zone to avoid making broken layouts

var WIDTH_CONSTRAINT_PERCENTAGE = 15;

var applyWidthConstraints = function applyWidthConstraints(width) {
  return Math.max(WIDTH_CONSTRAINT_PERCENTAGE, Math.min(width, 100 - WIDTH_CONSTRAINT_PERCENTAGE));
};

var LINK_DESTINATION_MEDIA = 'media';
var LINK_DESTINATION_ATTACHMENT = 'attachment';

var MediaTextEdit = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MediaTextEdit, _Component);

  var _super = _createSuper(MediaTextEdit);

  function MediaTextEdit() {
    var _this;

    (0, _classCallCheck2.default)(this, MediaTextEdit);
    _this = _super.apply(this, arguments);
    _this.onSelectMedia = _this.onSelectMedia.bind((0, _assertThisInitialized2.default)(_this));
    _this.onWidthChange = _this.onWidthChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.commitWidthChange = _this.commitWidthChange.bind((0, _assertThisInitialized2.default)(_this));
    _this.state = {
      mediaWidth: null
    };
    _this.onSetHref = _this.onSetHref.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(MediaTextEdit, [{
    key: "onSelectMedia",
    value: function onSelectMedia(media) {
      var setAttributes = this.props.setAttributes;
      var _this$props$attribute = this.props.attributes,
          linkDestination = _this$props$attribute.linkDestination,
          href = _this$props$attribute.href;
      var mediaType;
      var src; // for media selections originated from a file upload.

      if (media.media_type) {
        if (media.media_type === 'image') {
          mediaType = 'image';
        } else {
          // only images and videos are accepted so if the media_type is not an image we can assume it is a video.
          // video contain the media type of 'file' in the object returned from the rest api.
          mediaType = 'video';
        }
      } else {
        // for media selections originated from existing files in the media library.
        mediaType = media.type;
      }

      if (mediaType === 'image') {
        // Try the "large" size URL, falling back to the "full" size URL below.
        src = (0, _lodash.get)(media, ['sizes', 'large', 'url']) || (0, _lodash.get)(media, ['media_details', 'sizes', 'large', 'source_url']);
      }

      var newHref = href;

      if (linkDestination === LINK_DESTINATION_MEDIA) {
        // Update the media link.
        newHref = media.url;
      } // Check if the image is linked to the attachment page.


      if (linkDestination === LINK_DESTINATION_ATTACHMENT) {
        // Update the media link.
        newHref = media.link;
      }

      setAttributes({
        mediaAlt: media.alt,
        mediaId: media.id,
        mediaType: mediaType,
        mediaUrl: src || media.url,
        mediaLink: media.link || undefined,
        href: newHref,
        focalPoint: undefined
      });
    }
  }, {
    key: "onWidthChange",
    value: function onWidthChange(width) {
      this.setState({
        mediaWidth: applyWidthConstraints(width)
      });
    }
  }, {
    key: "onSetHref",
    value: function onSetHref(props) {
      this.props.setAttributes(props);
    }
  }, {
    key: "commitWidthChange",
    value: function commitWidthChange(width) {
      var setAttributes = this.props.setAttributes;
      setAttributes({
        mediaWidth: applyWidthConstraints(width)
      });
      this.setState({
        mediaWidth: null
      });
    }
  }, {
    key: "renderMediaArea",
    value: function renderMediaArea() {
      var _this$props = this.props,
          attributes = _this$props.attributes,
          isSelected = _this$props.isSelected;
      var mediaAlt = attributes.mediaAlt,
          mediaId = attributes.mediaId,
          mediaPosition = attributes.mediaPosition,
          mediaType = attributes.mediaType,
          mediaUrl = attributes.mediaUrl,
          mediaWidth = attributes.mediaWidth,
          imageFill = attributes.imageFill,
          focalPoint = attributes.focalPoint,
          isStackedOnMobile = attributes.isStackedOnMobile;
      return (0, _element.createElement)(_mediaContainer.default, (0, _extends2.default)({
        className: "wp-block-media-text__media",
        onSelectMedia: this.onSelectMedia,
        onWidthChange: this.onWidthChange,
        commitWidthChange: this.commitWidthChange
      }, {
        mediaAlt: mediaAlt,
        mediaId: mediaId,
        mediaType: mediaType,
        mediaUrl: mediaUrl,
        mediaPosition: mediaPosition,
        mediaWidth: mediaWidth,
        imageFill: imageFill,
        focalPoint: focalPoint,
        isSelected: isSelected,
        isStackedOnMobile: isStackedOnMobile
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props2 = this.props,
          attributes = _this$props2.attributes,
          className = _this$props2.className,
          isSelected = _this$props2.isSelected,
          setAttributes = _this$props2.setAttributes,
          image = _this$props2.image;
      var isStackedOnMobile = attributes.isStackedOnMobile,
          mediaAlt = attributes.mediaAlt,
          mediaPosition = attributes.mediaPosition,
          mediaType = attributes.mediaType,
          mediaWidth = attributes.mediaWidth,
          verticalAlignment = attributes.verticalAlignment,
          mediaUrl = attributes.mediaUrl,
          imageFill = attributes.imageFill,
          focalPoint = attributes.focalPoint,
          rel = attributes.rel,
          href = attributes.href,
          linkTarget = attributes.linkTarget,
          linkClass = attributes.linkClass,
          linkDestination = attributes.linkDestination;
      var temporaryMediaWidth = this.state.mediaWidth;
      var classNames = (0, _classnames2.default)(className, (_classnames = {
        'has-media-on-the-right': 'right' === mediaPosition,
        'is-selected': isSelected,
        'is-stacked-on-mobile': isStackedOnMobile
      }, (0, _defineProperty2.default)(_classnames, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment), (0, _defineProperty2.default)(_classnames, 'is-image-fill', imageFill), _classnames));
      var widthString = "".concat(temporaryMediaWidth || mediaWidth, "%");
      var gridTemplateColumns = 'right' === mediaPosition ? "1fr ".concat(widthString) : "".concat(widthString, " 1fr");
      var style = {
        gridTemplateColumns: gridTemplateColumns,
        msGridColumns: gridTemplateColumns
      };
      var toolbarControls = [{
        icon: _icons.pullLeft,
        title: (0, _i18n.__)('Show media on left'),
        isActive: mediaPosition === 'left',
        onClick: function onClick() {
          return setAttributes({
            mediaPosition: 'left'
          });
        }
      }, {
        icon: _icons.pullRight,
        title: (0, _i18n.__)('Show media on right'),
        isActive: mediaPosition === 'right',
        onClick: function onClick() {
          return setAttributes({
            mediaPosition: 'right'
          });
        }
      }];

      var onMediaAltChange = function onMediaAltChange(newMediaAlt) {
        setAttributes({
          mediaAlt: newMediaAlt
        });
      };

      var onVerticalAlignmentChange = function onVerticalAlignmentChange(alignment) {
        setAttributes({
          verticalAlignment: alignment
        });
      };

      var mediaTextGeneralSettings = (0, _element.createElement)(_components.PanelBody, {
        title: (0, _i18n.__)('Media & Text settings')
      }, (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Stack on mobile'),
        checked: isStackedOnMobile,
        onChange: function onChange() {
          return setAttributes({
            isStackedOnMobile: !isStackedOnMobile
          });
        }
      }), mediaType === 'image' && (0, _element.createElement)(_components.ToggleControl, {
        label: (0, _i18n.__)('Crop image to fill entire column'),
        checked: imageFill,
        onChange: function onChange() {
          return setAttributes({
            imageFill: !imageFill
          });
        }
      }), imageFill && (0, _element.createElement)(_components.FocalPointPicker, {
        label: (0, _i18n.__)('Focal point picker'),
        url: mediaUrl,
        value: focalPoint,
        onChange: function onChange(value) {
          return setAttributes({
            focalPoint: value
          });
        }
      }), mediaType === 'image' && (0, _element.createElement)(_components.TextareaControl, {
        label: (0, _i18n.__)('Alt text (alternative text)'),
        value: mediaAlt,
        onChange: onMediaAltChange,
        help: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.ExternalLink, {
          href: "https://www.w3.org/WAI/tutorials/images/decision-tree"
        }, (0, _i18n.__)('Describe the purpose of the image')), (0, _i18n.__)('Leave empty if the image is purely decorative.'))
      }));
      return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.InspectorControls, null, mediaTextGeneralSettings), (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_components.ToolbarGroup, {
        controls: toolbarControls
      }), (0, _element.createElement)(_blockEditor.BlockVerticalAlignmentToolbar, {
        onChange: onVerticalAlignmentChange,
        value: verticalAlignment
      }), mediaType === 'image' && (0, _element.createElement)(_components.ToolbarGroup, null, (0, _element.createElement)(_blockEditor.__experimentalImageURLInputUI, {
        url: href || '',
        onChangeUrl: this.onSetHref,
        linkDestination: linkDestination,
        mediaType: mediaType,
        mediaUrl: image && image.source_url,
        mediaLink: image && image.link,
        linkTarget: linkTarget,
        linkClass: linkClass,
        rel: rel
      }))), (0, _element.createElement)("div", {
        className: classNames,
        style: style
      }, this.renderMediaArea(), (0, _element.createElement)(_blockEditor.InnerBlocks, {
        template: TEMPLATE,
        templateInsertUpdatesSelection: false
      })));
    }
  }]);
  return MediaTextEdit;
}(_element.Component);

var _default = (0, _compose.compose)([(0, _data.withSelect)(function (select, props) {
  var _select = select('core'),
      getMedia = _select.getMedia;

  var mediaId = props.attributes.mediaId,
      isSelected = props.isSelected;
  return {
    image: mediaId && isSelected ? getMedia(mediaId) : null
  };
})])(MediaTextEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map