import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
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
import { every, get, isArray, noop, startsWith } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { Button, FormFileUpload, Placeholder, DropZone, withFilters } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import deprecated from '@wordpress/deprecated';
import { keyboardReturn } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import MediaUpload from '../media-upload';
import MediaUploadCheck from '../media-upload/check';
import URLPopover from '../url-popover';

var InsertFromURLPopover = function InsertFromURLPopover(_ref) {
  var src = _ref.src,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit,
      onClose = _ref.onClose;
  return createElement(URLPopover, {
    onClose: onClose
  }, createElement("form", {
    className: "block-editor-media-placeholder__url-input-form",
    onSubmit: onSubmit
  }, createElement("input", {
    className: "block-editor-media-placeholder__url-input-field",
    type: "url",
    "aria-label": __('URL'),
    placeholder: __('Paste or type URL'),
    onChange: onChange,
    value: src
  }), createElement(Button, {
    className: "block-editor-media-placeholder__url-input-submit-button",
    icon: keyboardReturn,
    label: __('Apply'),
    type: "submit"
  })));
};

export var MediaPlaceholder = /*#__PURE__*/function (_Component) {
  _inherits(MediaPlaceholder, _Component);

  var _super = _createSuper(MediaPlaceholder);

  function MediaPlaceholder() {
    var _this;

    _classCallCheck(this, MediaPlaceholder);

    _this = _super.apply(this, arguments);
    _this.state = {
      src: '',
      isURLInputVisible: false
    };
    _this.onChangeSrc = _this.onChangeSrc.bind(_assertThisInitialized(_this));
    _this.onSubmitSrc = _this.onSubmitSrc.bind(_assertThisInitialized(_this));
    _this.onUpload = _this.onUpload.bind(_assertThisInitialized(_this));
    _this.onFilesUpload = _this.onFilesUpload.bind(_assertThisInitialized(_this));
    _this.openURLInput = _this.openURLInput.bind(_assertThisInitialized(_this));
    _this.closeURLInput = _this.closeURLInput.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(MediaPlaceholder, [{
    key: "onlyAllowsImages",
    value: function onlyAllowsImages() {
      var allowedTypes = this.props.allowedTypes;

      if (!allowedTypes) {
        return false;
      }

      return every(allowedTypes, function (allowedType) {
        return allowedType === 'image' || startsWith(allowedType, 'image/');
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        src: get(this.props.value, ['src'], '')
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (get(prevProps.value, ['src'], '') !== get(this.props.value, ['src'], '')) {
        this.setState({
          src: get(this.props.value, ['src'], '')
        });
      }
    }
  }, {
    key: "onChangeSrc",
    value: function onChangeSrc(event) {
      this.setState({
        src: event.target.value
      });
    }
  }, {
    key: "onSubmitSrc",
    value: function onSubmitSrc(event) {
      event.preventDefault();

      if (this.state.src && this.props.onSelectURL) {
        this.props.onSelectURL(this.state.src);
        this.closeURLInput();
      }
    }
  }, {
    key: "onUpload",
    value: function onUpload(event) {
      this.onFilesUpload(event.target.files);
    }
  }, {
    key: "onFilesUpload",
    value: function onFilesUpload(files) {
      var _this2 = this;

      var _this$props = this.props,
          addToGallery = _this$props.addToGallery,
          allowedTypes = _this$props.allowedTypes,
          mediaUpload = _this$props.mediaUpload,
          multiple = _this$props.multiple,
          onError = _this$props.onError,
          onSelect = _this$props.onSelect;
      var setMedia;

      if (multiple) {
        if (addToGallery) {
          // To allow changes to a gallery to be made while uploads are in progress
          // (including trigging multiple upload groups and removing already in place images),
          // we must be able to add newMedia based on the current value of the Gallery
          // whenever the setMedia function runs (not destructuring 'value' from props).
          // Additionally, since the setMedia function runs multiple times per upload group
          // and is passed newMedia containing every item in its group each time, we must
          // also filter out whatever this upload group had previously returned to the
          // gallery before adding and returning the image array with replacement newMedia
          // values.
          // Define an array to store urls from newMedia between subsequent function calls.
          var lastMediaPassed = [];

          setMedia = function setMedia(newMedia) {
            // Remove any images this upload group is responsible for (lastMediaPassed).
            // Their replacements are contained in newMedia.
            var filteredMedia = (_this2.props.value || []).filter(function (item) {
              // If Item has id, only remove it if lastMediaPassed has an item with that id.
              if (item.id) {
                return !lastMediaPassed.some( // Be sure to convert to number for comparison.
                function (_ref2) {
                  var id = _ref2.id;
                  return Number(id) === Number(item.id);
                });
              } // Compare transient images via .includes since gallery may append extra info onto the url.


              return !lastMediaPassed.some(function (_ref3) {
                var urlSlug = _ref3.urlSlug;
                return item.url.includes(urlSlug);
              });
            }); // Return the filtered media array along with newMedia.

            onSelect(filteredMedia.concat(newMedia)); // Reset lastMediaPassed and set it with ids and urls from newMedia.

            lastMediaPassed = newMedia.map(function (media) {
              // Add everything up to '.fileType' to compare via .includes.
              var cutOffIndex = media.url.lastIndexOf('.');
              var urlSlug = media.url.slice(0, cutOffIndex);
              return {
                id: media.id,
                urlSlug: urlSlug
              };
            });
          };
        } else {
          setMedia = onSelect;
        }
      } else {
        setMedia = function setMedia(_ref4) {
          var _ref5 = _slicedToArray(_ref4, 1),
              media = _ref5[0];

          return onSelect(media);
        };
      }

      mediaUpload({
        allowedTypes: allowedTypes,
        filesList: files,
        onFileChange: setMedia,
        onError: onError
      });
    }
  }, {
    key: "openURLInput",
    value: function openURLInput() {
      this.setState({
        isURLInputVisible: true
      });
    }
  }, {
    key: "closeURLInput",
    value: function closeURLInput() {
      this.setState({
        isURLInputVisible: false
      });
    }
  }, {
    key: "renderPlaceholder",
    value: function renderPlaceholder(content, onClick) {
      var _this$props2 = this.props,
          _this$props2$allowedT = _this$props2.allowedTypes,
          allowedTypes = _this$props2$allowedT === void 0 ? [] : _this$props2$allowedT,
          className = _this$props2.className,
          icon = _this$props2.icon,
          isAppender = _this$props2.isAppender,
          _this$props2$labels = _this$props2.labels,
          labels = _this$props2$labels === void 0 ? {} : _this$props2$labels,
          onDoubleClick = _this$props2.onDoubleClick,
          mediaPreview = _this$props2.mediaPreview,
          notices = _this$props2.notices,
          onSelectURL = _this$props2.onSelectURL,
          mediaUpload = _this$props2.mediaUpload,
          children = _this$props2.children;
      var instructions = labels.instructions;
      var title = labels.title;

      if (!mediaUpload && !onSelectURL) {
        instructions = __('To edit this block, you need permission to upload media.');
      }

      if (instructions === undefined || title === undefined) {
        var isOneType = 1 === allowedTypes.length;
        var isAudio = isOneType && 'audio' === allowedTypes[0];
        var isImage = isOneType && 'image' === allowedTypes[0];
        var isVideo = isOneType && 'video' === allowedTypes[0];

        if (instructions === undefined && mediaUpload) {
          instructions = __('Upload a media file or pick one from your media library.');

          if (isAudio) {
            instructions = __('Upload an audio file, pick one from your media library, or add one with a URL.');
          } else if (isImage) {
            instructions = __('Upload an image file, pick one from your media library, or add one with a URL.');
          } else if (isVideo) {
            instructions = __('Upload a video file, pick one from your media library, or add one with a URL.');
          }
        }

        if (title === undefined) {
          title = __('Media');

          if (isAudio) {
            title = __('Audio');
          } else if (isImage) {
            title = __('Image');
          } else if (isVideo) {
            title = __('Video');
          }
        }
      }

      var placeholderClassName = classnames('block-editor-media-placeholder', className, {
        'is-appender': isAppender
      });
      return createElement(Placeholder, {
        icon: icon,
        label: title,
        instructions: instructions,
        className: placeholderClassName,
        notices: notices,
        onClick: onClick,
        onDoubleClick: onDoubleClick,
        preview: mediaPreview
      }, content, children);
    }
  }, {
    key: "renderDropZone",
    value: function renderDropZone() {
      var _this$props3 = this.props,
          disableDropZone = _this$props3.disableDropZone,
          _this$props3$onHTMLDr = _this$props3.onHTMLDrop,
          onHTMLDrop = _this$props3$onHTMLDr === void 0 ? noop : _this$props3$onHTMLDr;

      if (disableDropZone) {
        return null;
      }

      return createElement(DropZone, {
        onFilesDrop: this.onFilesUpload,
        onHTMLDrop: onHTMLDrop
      });
    }
  }, {
    key: "renderCancelLink",
    value: function renderCancelLink() {
      var onCancel = this.props.onCancel;
      return onCancel && createElement(Button, {
        className: "block-editor-media-placeholder__cancel-button",
        title: __('Cancel'),
        isLink: true,
        onClick: onCancel
      }, __('Cancel'));
    }
  }, {
    key: "renderUrlSelectionUI",
    value: function renderUrlSelectionUI() {
      var onSelectURL = this.props.onSelectURL;

      if (!onSelectURL) {
        return null;
      }

      var _this$state = this.state,
          isURLInputVisible = _this$state.isURLInputVisible,
          src = _this$state.src;
      return createElement("div", {
        className: "block-editor-media-placeholder__url-input-container"
      }, createElement(Button, {
        className: "block-editor-media-placeholder__button",
        onClick: this.openURLInput,
        isPressed: isURLInputVisible,
        isTertiary: true
      }, __('Insert from URL')), isURLInputVisible && createElement(InsertFromURLPopover, {
        src: src,
        onChange: this.onChangeSrc,
        onSubmit: this.onSubmitSrc,
        onClose: this.closeURLInput
      }));
    }
  }, {
    key: "renderMediaUploadChecked",
    value: function renderMediaUploadChecked() {
      var _this3 = this;

      var _this$props4 = this.props,
          accept = _this$props4.accept,
          addToGallery = _this$props4.addToGallery,
          _this$props4$allowedT = _this$props4.allowedTypes,
          allowedTypes = _this$props4$allowedT === void 0 ? [] : _this$props4$allowedT,
          isAppender = _this$props4.isAppender,
          mediaUpload = _this$props4.mediaUpload,
          _this$props4$multiple = _this$props4.multiple,
          multiple = _this$props4$multiple === void 0 ? false : _this$props4$multiple,
          onSelect = _this$props4.onSelect,
          _this$props4$value = _this$props4.value,
          value = _this$props4$value === void 0 ? {} : _this$props4$value;
      var mediaLibraryButton = createElement(MediaUpload, {
        addToGallery: addToGallery,
        gallery: multiple && this.onlyAllowsImages(),
        multiple: multiple,
        onSelect: onSelect,
        allowedTypes: allowedTypes,
        value: isArray(value) ? value.map(function (_ref6) {
          var id = _ref6.id;
          return id;
        }) : value.id,
        render: function render(_ref7) {
          var open = _ref7.open;
          return createElement(Button, {
            isTertiary: true,
            onClick: function onClick(event) {
              event.stopPropagation();
              open();
            }
          }, __('Media Library'));
        }
      });

      if (mediaUpload && isAppender) {
        return createElement(Fragment, null, this.renderDropZone(), createElement(FormFileUpload, {
          onChange: this.onUpload,
          accept: accept,
          multiple: multiple,
          render: function render(_ref8) {
            var openFileDialog = _ref8.openFileDialog;
            var content = createElement(Fragment, null, createElement(Button, {
              isPrimary: true,
              className: classnames('block-editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button')
            }, __('Upload')), mediaLibraryButton, _this3.renderUrlSelectionUI(), _this3.renderCancelLink());
            return _this3.renderPlaceholder(content, openFileDialog);
          }
        }));
      }

      if (mediaUpload) {
        var content = createElement(Fragment, null, this.renderDropZone(), createElement(FormFileUpload, {
          isPrimary: true,
          className: classnames('block-editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button'),
          onChange: this.onUpload,
          accept: accept,
          multiple: multiple
        }, __('Upload')), mediaLibraryButton, this.renderUrlSelectionUI(), this.renderCancelLink());
        return this.renderPlaceholder(content);
      }

      return this.renderPlaceholder(mediaLibraryButton);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          disableMediaButtons = _this$props5.disableMediaButtons,
          dropZoneUIOnly = _this$props5.dropZoneUIOnly;

      if (dropZoneUIOnly || disableMediaButtons) {
        if (dropZoneUIOnly) {
          deprecated('wp.blockEditor.MediaPlaceholder dropZoneUIOnly prop', {
            alternative: 'disableMediaButtons'
          });
        }

        return createElement(MediaUploadCheck, null, this.renderDropZone());
      }

      return createElement(MediaUploadCheck, {
        fallback: this.renderPlaceholder(this.renderUrlSelectionUI())
      }, this.renderMediaUploadChecked());
    }
  }]);

  return MediaPlaceholder;
}(Component);
var applyWithSelect = withSelect(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    mediaUpload: getSettings().mediaUpload
  };
});
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/media-placeholder/README.md
 */

export default compose(applyWithSelect, withFilters('editor.MediaPlaceholder'))(MediaPlaceholder);
//# sourceMappingURL=index.js.map