"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.MediaPlaceholder = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _lodash = require("lodash");

var _classnames = _interopRequireDefault(require("classnames"));

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _deprecated = _interopRequireDefault(require("@wordpress/deprecated"));

var _icons = require("@wordpress/icons");

var _mediaUpload = _interopRequireDefault(require("../media-upload"));

var _check = _interopRequireDefault(require("../media-upload/check"));

var _urlPopover = _interopRequireDefault(require("../url-popover"));

function _createSuper(Derived) { return function () { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

var InsertFromURLPopover = function InsertFromURLPopover(_ref) {
  var src = _ref.src,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit,
      onClose = _ref.onClose;
  return (0, _element.createElement)(_urlPopover.default, {
    onClose: onClose
  }, (0, _element.createElement)("form", {
    className: "block-editor-media-placeholder__url-input-form",
    onSubmit: onSubmit
  }, (0, _element.createElement)("input", {
    className: "block-editor-media-placeholder__url-input-field",
    type: "url",
    "aria-label": (0, _i18n.__)('URL'),
    placeholder: (0, _i18n.__)('Paste or type URL'),
    onChange: onChange,
    value: src
  }), (0, _element.createElement)(_components.Button, {
    className: "block-editor-media-placeholder__url-input-submit-button",
    icon: _icons.keyboardReturn,
    label: (0, _i18n.__)('Apply'),
    type: "submit"
  })));
};

var MediaPlaceholder = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(MediaPlaceholder, _Component);

  var _super = _createSuper(MediaPlaceholder);

  function MediaPlaceholder() {
    var _this;

    (0, _classCallCheck2.default)(this, MediaPlaceholder);
    _this = _super.apply(this, arguments);
    _this.state = {
      src: '',
      isURLInputVisible: false
    };
    _this.onChangeSrc = _this.onChangeSrc.bind((0, _assertThisInitialized2.default)(_this));
    _this.onSubmitSrc = _this.onSubmitSrc.bind((0, _assertThisInitialized2.default)(_this));
    _this.onUpload = _this.onUpload.bind((0, _assertThisInitialized2.default)(_this));
    _this.onFilesUpload = _this.onFilesUpload.bind((0, _assertThisInitialized2.default)(_this));
    _this.openURLInput = _this.openURLInput.bind((0, _assertThisInitialized2.default)(_this));
    _this.closeURLInput = _this.closeURLInput.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  (0, _createClass2.default)(MediaPlaceholder, [{
    key: "onlyAllowsImages",
    value: function onlyAllowsImages() {
      var allowedTypes = this.props.allowedTypes;

      if (!allowedTypes) {
        return false;
      }

      return (0, _lodash.every)(allowedTypes, function (allowedType) {
        return allowedType === 'image' || (0, _lodash.startsWith)(allowedType, 'image/');
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        src: (0, _lodash.get)(this.props.value, ['src'], '')
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if ((0, _lodash.get)(prevProps.value, ['src'], '') !== (0, _lodash.get)(this.props.value, ['src'], '')) {
        this.setState({
          src: (0, _lodash.get)(this.props.value, ['src'], '')
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
          var _ref5 = (0, _slicedToArray2.default)(_ref4, 1),
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
        instructions = (0, _i18n.__)('To edit this block, you need permission to upload media.');
      }

      if (instructions === undefined || title === undefined) {
        var isOneType = 1 === allowedTypes.length;
        var isAudio = isOneType && 'audio' === allowedTypes[0];
        var isImage = isOneType && 'image' === allowedTypes[0];
        var isVideo = isOneType && 'video' === allowedTypes[0];

        if (instructions === undefined && mediaUpload) {
          instructions = (0, _i18n.__)('Upload a media file or pick one from your media library.');

          if (isAudio) {
            instructions = (0, _i18n.__)('Upload an audio file, pick one from your media library, or add one with a URL.');
          } else if (isImage) {
            instructions = (0, _i18n.__)('Upload an image file, pick one from your media library, or add one with a URL.');
          } else if (isVideo) {
            instructions = (0, _i18n.__)('Upload a video file, pick one from your media library, or add one with a URL.');
          }
        }

        if (title === undefined) {
          title = (0, _i18n.__)('Media');

          if (isAudio) {
            title = (0, _i18n.__)('Audio');
          } else if (isImage) {
            title = (0, _i18n.__)('Image');
          } else if (isVideo) {
            title = (0, _i18n.__)('Video');
          }
        }
      }

      var placeholderClassName = (0, _classnames.default)('block-editor-media-placeholder', className, {
        'is-appender': isAppender
      });
      return (0, _element.createElement)(_components.Placeholder, {
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
          onHTMLDrop = _this$props3$onHTMLDr === void 0 ? _lodash.noop : _this$props3$onHTMLDr;

      if (disableDropZone) {
        return null;
      }

      return (0, _element.createElement)(_components.DropZone, {
        onFilesDrop: this.onFilesUpload,
        onHTMLDrop: onHTMLDrop
      });
    }
  }, {
    key: "renderCancelLink",
    value: function renderCancelLink() {
      var onCancel = this.props.onCancel;
      return onCancel && (0, _element.createElement)(_components.Button, {
        className: "block-editor-media-placeholder__cancel-button",
        title: (0, _i18n.__)('Cancel'),
        isLink: true,
        onClick: onCancel
      }, (0, _i18n.__)('Cancel'));
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
      return (0, _element.createElement)("div", {
        className: "block-editor-media-placeholder__url-input-container"
      }, (0, _element.createElement)(_components.Button, {
        className: "block-editor-media-placeholder__button",
        onClick: this.openURLInput,
        isPressed: isURLInputVisible,
        isTertiary: true
      }, (0, _i18n.__)('Insert from URL')), isURLInputVisible && (0, _element.createElement)(InsertFromURLPopover, {
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
      var mediaLibraryButton = (0, _element.createElement)(_mediaUpload.default, {
        addToGallery: addToGallery,
        gallery: multiple && this.onlyAllowsImages(),
        multiple: multiple,
        onSelect: onSelect,
        allowedTypes: allowedTypes,
        value: (0, _lodash.isArray)(value) ? value.map(function (_ref6) {
          var id = _ref6.id;
          return id;
        }) : value.id,
        render: function render(_ref7) {
          var open = _ref7.open;
          return (0, _element.createElement)(_components.Button, {
            isTertiary: true,
            onClick: function onClick(event) {
              event.stopPropagation();
              open();
            }
          }, (0, _i18n.__)('Media Library'));
        }
      });

      if (mediaUpload && isAppender) {
        return (0, _element.createElement)(_element.Fragment, null, this.renderDropZone(), (0, _element.createElement)(_components.FormFileUpload, {
          onChange: this.onUpload,
          accept: accept,
          multiple: multiple,
          render: function render(_ref8) {
            var openFileDialog = _ref8.openFileDialog;
            var content = (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.Button, {
              isPrimary: true,
              className: (0, _classnames.default)('block-editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button')
            }, (0, _i18n.__)('Upload')), mediaLibraryButton, _this3.renderUrlSelectionUI(), _this3.renderCancelLink());
            return _this3.renderPlaceholder(content, openFileDialog);
          }
        }));
      }

      if (mediaUpload) {
        var content = (0, _element.createElement)(_element.Fragment, null, this.renderDropZone(), (0, _element.createElement)(_components.FormFileUpload, {
          isPrimary: true,
          className: (0, _classnames.default)('block-editor-media-placeholder__button', 'block-editor-media-placeholder__upload-button'),
          onChange: this.onUpload,
          accept: accept,
          multiple: multiple
        }, (0, _i18n.__)('Upload')), mediaLibraryButton, this.renderUrlSelectionUI(), this.renderCancelLink());
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
          (0, _deprecated.default)('wp.blockEditor.MediaPlaceholder dropZoneUIOnly prop', {
            alternative: 'disableMediaButtons'
          });
        }

        return (0, _element.createElement)(_check.default, null, this.renderDropZone());
      }

      return (0, _element.createElement)(_check.default, {
        fallback: this.renderPlaceholder(this.renderUrlSelectionUI())
      }, this.renderMediaUploadChecked());
    }
  }]);
  return MediaPlaceholder;
}(_element.Component);

exports.MediaPlaceholder = MediaPlaceholder;
var applyWithSelect = (0, _data.withSelect)(function (select) {
  var _select = select('core/block-editor'),
      getSettings = _select.getSettings;

  return {
    mediaUpload: getSettings().mediaUpload
  };
});
/**
 * @see https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/media-placeholder/README.md
 */

var _default = (0, _compose.compose)(applyWithSelect, (0, _components.withFilters)('editor.MediaPlaceholder'))(MediaPlaceholder);

exports.default = _default;
//# sourceMappingURL=index.js.map