import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import { createElement, Fragment } from "@wordpress/element";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/**
 * External dependencies
 */
import classnames from 'classnames';
import { get } from 'lodash';
/**
 * WordPress dependencies
 */

import { __, _x } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { BlockControls, BlockVerticalAlignmentToolbar, InnerBlocks, InspectorControls, __experimentalImageURLInputUI as ImageURLInputUI } from '@wordpress/block-editor';
import { Component } from '@wordpress/element';
import { PanelBody, TextareaControl, ToggleControl, ToolbarGroup, ExternalLink, FocalPointPicker } from '@wordpress/components';
import { pullLeft, pullRight } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import MediaContainer from './media-container';
/**
 * Constants
 */

var TEMPLATE = [['core/paragraph', {
  fontSize: 'large',
  placeholder: _x('Content…', 'content placeholder')
}]]; // this limits the resize to a safe zone to avoid making broken layouts

var WIDTH_CONSTRAINT_PERCENTAGE = 15;

var applyWidthConstraints = function applyWidthConstraints(width) {
  return Math.max(WIDTH_CONSTRAINT_PERCENTAGE, Math.min(width, 100 - WIDTH_CONSTRAINT_PERCENTAGE));
};

var LINK_DESTINATION_MEDIA = 'media';
var LINK_DESTINATION_ATTACHMENT = 'attachment';

var MediaTextEdit = /*#__PURE__*/function (_Component) {
  _inherits(MediaTextEdit, _Component);

  var _super = _createSuper(MediaTextEdit);

  function MediaTextEdit() {
    var _this;

    _classCallCheck(this, MediaTextEdit);

    _this = _super.apply(this, arguments);
    _this.onSelectMedia = _this.onSelectMedia.bind(_assertThisInitialized(_this));
    _this.onWidthChange = _this.onWidthChange.bind(_assertThisInitialized(_this));
    _this.commitWidthChange = _this.commitWidthChange.bind(_assertThisInitialized(_this));
    _this.state = {
      mediaWidth: null
    };
    _this.onSetHref = _this.onSetHref.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MediaTextEdit, [{
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
        src = get(media, ['sizes', 'large', 'url']) || get(media, ['media_details', 'sizes', 'large', 'source_url']);
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
      return createElement(MediaContainer, _extends({
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
      var classNames = classnames(className, (_classnames = {
        'has-media-on-the-right': 'right' === mediaPosition,
        'is-selected': isSelected,
        'is-stacked-on-mobile': isStackedOnMobile
      }, _defineProperty(_classnames, "is-vertically-aligned-".concat(verticalAlignment), verticalAlignment), _defineProperty(_classnames, 'is-image-fill', imageFill), _classnames));
      var widthString = "".concat(temporaryMediaWidth || mediaWidth, "%");
      var gridTemplateColumns = 'right' === mediaPosition ? "1fr ".concat(widthString) : "".concat(widthString, " 1fr");
      var style = {
        gridTemplateColumns: gridTemplateColumns,
        msGridColumns: gridTemplateColumns
      };
      var toolbarControls = [{
        icon: pullLeft,
        title: __('Show media on left'),
        isActive: mediaPosition === 'left',
        onClick: function onClick() {
          return setAttributes({
            mediaPosition: 'left'
          });
        }
      }, {
        icon: pullRight,
        title: __('Show media on right'),
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

      var mediaTextGeneralSettings = createElement(PanelBody, {
        title: __('Media & Text settings')
      }, createElement(ToggleControl, {
        label: __('Stack on mobile'),
        checked: isStackedOnMobile,
        onChange: function onChange() {
          return setAttributes({
            isStackedOnMobile: !isStackedOnMobile
          });
        }
      }), mediaType === 'image' && createElement(ToggleControl, {
        label: __('Crop image to fill entire column'),
        checked: imageFill,
        onChange: function onChange() {
          return setAttributes({
            imageFill: !imageFill
          });
        }
      }), imageFill && createElement(FocalPointPicker, {
        label: __('Focal point picker'),
        url: mediaUrl,
        value: focalPoint,
        onChange: function onChange(value) {
          return setAttributes({
            focalPoint: value
          });
        }
      }), mediaType === 'image' && createElement(TextareaControl, {
        label: __('Alt text (alternative text)'),
        value: mediaAlt,
        onChange: onMediaAltChange,
        help: createElement(Fragment, null, createElement(ExternalLink, {
          href: "https://www.w3.org/WAI/tutorials/images/decision-tree"
        }, __('Describe the purpose of the image')), __('Leave empty if the image is purely decorative.'))
      }));
      return createElement(Fragment, null, createElement(InspectorControls, null, mediaTextGeneralSettings), createElement(BlockControls, null, createElement(ToolbarGroup, {
        controls: toolbarControls
      }), createElement(BlockVerticalAlignmentToolbar, {
        onChange: onVerticalAlignmentChange,
        value: verticalAlignment
      }), mediaType === 'image' && createElement(ToolbarGroup, null, createElement(ImageURLInputUI, {
        url: href || '',
        onChangeUrl: this.onSetHref,
        linkDestination: linkDestination,
        mediaType: mediaType,
        mediaUrl: image && image.source_url,
        mediaLink: image && image.link,
        linkTarget: linkTarget,
        linkClass: linkClass,
        rel: rel
      }))), createElement("div", {
        className: classNames,
        style: style
      }, this.renderMediaArea(), createElement(InnerBlocks, {
        template: TEMPLATE,
        templateInsertUpdatesSelection: false
      })));
    }
  }]);

  return MediaTextEdit;
}(Component);

export default compose([withSelect(function (select, props) {
  var _select = select('core'),
      getMedia = _select.getMedia;

  var mediaId = props.attributes.mediaId,
      isSelected = props.isSelected;
  return {
    image: mediaId && isSelected ? getMedia(mediaId) : null
  };
})])(MediaTextEdit);
//# sourceMappingURL=edit.js.map