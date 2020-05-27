"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ImageEdit = ImageEdit;
exports.default = exports.pickRelevantMediaFiles = void 0;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _lodash = require("lodash");

var _blob = require("@wordpress/blob");

var _components = require("@wordpress/components");

var _compose = require("@wordpress/compose");

var _data = require("@wordpress/data");

var _blockEditor = require("@wordpress/block-editor");

var _i18n = require("@wordpress/i18n");

var _url = require("@wordpress/url");

var _icons = require("@wordpress/icons");

var _blocks = require("@wordpress/blocks");

var _util = require("../embed/util");

var _imageSize = _interopRequireDefault(require("./image-size"));

var _constants = require("./constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var pickRelevantMediaFiles = function pickRelevantMediaFiles(image) {
  var imageProps = (0, _lodash.pick)(image, ['alt', 'id', 'link', 'caption']);
  imageProps.url = (0, _lodash.get)(image, ['sizes', 'large', 'url']) || (0, _lodash.get)(image, ['media_details', 'sizes', 'large', 'source_url']) || image.url;
  return imageProps;
};
/**
 * Is the URL a temporary blob URL? A blob URL is one that is used temporarily
 * while the image is being uploaded and will not have an id yet allocated.
 *
 * @param {number=} id The id of the image.
 * @param {string=} url The url of the image.
 *
 * @return {boolean} Is the URL a Blob URL
 */


exports.pickRelevantMediaFiles = pickRelevantMediaFiles;

var isTemporaryImage = function isTemporaryImage(id, url) {
  return !id && (0, _blob.isBlobURL)(url);
};
/**
 * Is the url for the image hosted externally. An externally hosted image has no
 * id and is not a blob url.
 *
 * @param {number=} id  The id of the image.
 * @param {string=} url The url of the image.
 *
 * @return {boolean} Is the url an externally hosted url?
 */


var isExternalImage = function isExternalImage(id, url) {
  return url && !id && !(0, _blob.isBlobURL)(url);
};

function getFilename(url) {
  var path = (0, _url.getPath)(url);

  if (path) {
    return (0, _lodash.last)(path.split('/'));
  }
}

function ImageEdit(_ref) {
  var _ref$attributes = _ref.attributes,
      _ref$attributes$url = _ref$attributes.url,
      url = _ref$attributes$url === void 0 ? '' : _ref$attributes$url,
      alt = _ref$attributes.alt,
      caption = _ref$attributes.caption,
      align = _ref$attributes.align,
      id = _ref$attributes.id,
      href = _ref$attributes.href,
      rel = _ref$attributes.rel,
      linkClass = _ref$attributes.linkClass,
      linkDestination = _ref$attributes.linkDestination,
      title = _ref$attributes.title,
      width = _ref$attributes.width,
      height = _ref$attributes.height,
      linkTarget = _ref$attributes.linkTarget,
      sizeSlug = _ref$attributes.sizeSlug,
      setAttributes = _ref.setAttributes,
      isSelected = _ref.isSelected,
      className = _ref.className,
      noticeUI = _ref.noticeUI,
      insertBlocksAfter = _ref.insertBlocksAfter,
      noticeOperations = _ref.noticeOperations,
      onReplace = _ref.onReplace;
  var ref = (0, _element.useRef)();

  var _useSelect = (0, _data.useSelect)(function (select) {
    var _select = select('core'),
        getMedia = _select.getMedia;

    var _select2 = select('core/block-editor'),
        getSettings = _select2.getSettings;

    return _objectSpread({}, (0, _lodash.pick)(getSettings(), ['mediaUpload', 'imageSizes', 'isRTL', 'maxWidth']), {
      image: id && isSelected ? getMedia(id) : null
    });
  }, [id, isSelected]),
      image = _useSelect.image,
      maxWidth = _useSelect.maxWidth,
      isRTL = _useSelect.isRTL,
      imageSizes = _useSelect.imageSizes,
      mediaUpload = _useSelect.mediaUpload;

  var _useDispatch = (0, _data.useDispatch)('core/block-editor'),
      toggleSelection = _useDispatch.toggleSelection;

  var isLargeViewport = (0, _compose.useViewportMatch)('medium');

  var _useState = (0, _element.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      captionFocused = _useState2[0],
      setCaptionFocused = _useState2[1];

  var isWideAligned = (0, _lodash.includes)(['wide', 'full'], align);

  function onResizeStart() {
    toggleSelection(false);
  }

  function _onResizeStop() {
    toggleSelection(true);
  }

  function onUploadError(message) {
    noticeOperations.removeAllNotices();
    noticeOperations.createErrorNotice(message);
  }

  function onSelectImage(media) {
    if (!media || !media.url) {
      setAttributes({
        url: undefined,
        alt: undefined,
        id: undefined,
        title: undefined,
        caption: undefined
      });
      return;
    }

    var mediaAttributes = pickRelevantMediaFiles(media); // If the current image is temporary but an alt text was meanwhile
    // written by the user, make sure the text is not overwritten.

    if (isTemporaryImage(id, url)) {
      if (alt) {
        mediaAttributes = (0, _lodash.omit)(mediaAttributes, ['alt']);
      }
    } // If a caption text was meanwhile written by the user,
    // make sure the text is not overwritten by empty captions.


    if (caption && !(0, _lodash.get)(mediaAttributes, ['caption'])) {
      mediaAttributes = (0, _lodash.omit)(mediaAttributes, ['caption']);
    }

    var additionalAttributes; // Reset the dimension attributes if changing to a different image.

    if (!media.id || media.id !== id) {
      additionalAttributes = {
        width: undefined,
        height: undefined,
        sizeSlug: _constants.DEFAULT_SIZE_SLUG
      };
    } else {
      // Keep the same url when selecting the same file, so "Image Size"
      // option is not changed.
      additionalAttributes = {
        url: url
      };
    } // Check if the image is linked to it's media.


    if (linkDestination === _constants.LINK_DESTINATION_MEDIA) {
      // Update the media link.
      mediaAttributes.href = media.url;
    } // Check if the image is linked to the attachment page.


    if (linkDestination === _constants.LINK_DESTINATION_ATTACHMENT) {
      // Update the media link.
      mediaAttributes.href = media.link;
    }

    setAttributes(_objectSpread({}, mediaAttributes, {}, additionalAttributes));
  }

  function onSelectURL(newURL) {
    if (newURL !== url) {
      setAttributes({
        url: newURL,
        id: undefined,
        sizeSlug: _constants.DEFAULT_SIZE_SLUG
      });
    }
  }

  function onImageError() {
    // Check if there's an embed block that handles this URL.
    var embedBlock = (0, _util.createUpgradedEmbedBlock)({
      attributes: {
        url: url
      }
    });

    if (undefined !== embedBlock) {
      onReplace(embedBlock);
    }
  }

  function onSetHref(props) {
    setAttributes(props);
  }

  function onSetTitle(value) {
    // This is the HTML title attribute, separate from the media object
    // title.
    setAttributes({
      title: value
    });
  }

  function onFocusCaption() {
    if (!captionFocused) {
      setCaptionFocused(true);
    }
  }

  function onImageClick() {
    if (captionFocused) {
      setCaptionFocused(false);
    }
  }

  function updateAlt(newAlt) {
    setAttributes({
      alt: newAlt
    });
  }

  function updateAlignment(nextAlign) {
    var extraUpdatedAttributes = isWideAligned ? {
      width: undefined,
      height: undefined
    } : {};
    setAttributes(_objectSpread({}, extraUpdatedAttributes, {
      align: nextAlign
    }));
  }

  function updateImage(newSizeSlug) {
    var newUrl = (0, _lodash.get)(image, ['media_details', 'sizes', newSizeSlug, 'source_url']);

    if (!newUrl) {
      return null;
    }

    setAttributes({
      url: url,
      width: undefined,
      height: undefined,
      sizeSlug: newSizeSlug
    });
  }

  function getImageSizeOptions() {
    return (0, _lodash.map)((0, _lodash.filter)(imageSizes, function (_ref2) {
      var slug = _ref2.slug;
      return (0, _lodash.get)(image, ['media_details', 'sizes', slug, 'source_url']);
    }), function (_ref3) {
      var name = _ref3.name,
          slug = _ref3.slug;
      return {
        value: slug,
        label: name
      };
    });
  }

  var isTemp = isTemporaryImage(id, url); // Upload a temporary image on mount.

  (0, _element.useEffect)(function () {
    if (!isTemp) {
      return;
    }

    var file = (0, _blob.getBlobByURL)(url);

    if (file) {
      mediaUpload({
        filesList: [file],
        onFileChange: function onFileChange(_ref4) {
          var _ref5 = (0, _slicedToArray2.default)(_ref4, 1),
              img = _ref5[0];

          onSelectImage(img);
        },
        allowedTypes: _constants.ALLOWED_MEDIA_TYPES,
        onError: function onError(message) {
          noticeOperations.createErrorNotice(message);
        }
      });
    }
  }, []); // If an image is temporary, revoke the Blob url when it is uploaded (and is
  // no longer temporary).

  (0, _element.useEffect)(function () {
    if (!isTemp) {
      return;
    }

    return function () {
      (0, _blob.revokeBlobURL)(url);
    };
  }, [isTemp]);
  (0, _element.useEffect)(function () {
    if (!isSelected) {
      setCaptionFocused(false);
    }
  }, [isSelected]);
  var isExternal = isExternalImage(id, url);
  var controls = (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.BlockAlignmentToolbar, {
    value: align,
    onChange: updateAlignment
  }), url && (0, _element.createElement)(_blockEditor.MediaReplaceFlow, {
    mediaId: id,
    mediaURL: url,
    allowedTypes: _constants.ALLOWED_MEDIA_TYPES,
    accept: "image/*",
    onSelect: onSelectImage,
    onSelectURL: onSelectURL,
    onError: onUploadError
  }), url && (0, _element.createElement)(_components.ToolbarGroup, null, (0, _element.createElement)(_blockEditor.__experimentalImageURLInputUI, {
    url: href || '',
    onChangeUrl: onSetHref,
    linkDestination: linkDestination,
    mediaUrl: image && image.source_url,
    mediaLink: image && image.link,
    linkTarget: linkTarget,
    linkClass: linkClass,
    rel: rel
  })));
  var src = isExternal ? url : undefined;
  var mediaPreview = !!url && (0, _element.createElement)("img", {
    alt: (0, _i18n.__)('Edit image'),
    title: (0, _i18n.__)('Edit image'),
    className: 'edit-image-preview',
    src: url
  });
  var mediaPlaceholder = (0, _element.createElement)(_blockEditor.MediaPlaceholder, {
    icon: (0, _element.createElement)(_blockEditor.BlockIcon, {
      icon: _icons.image
    }),
    onSelect: onSelectImage,
    onSelectURL: onSelectURL,
    notices: noticeUI,
    onError: onUploadError,
    accept: "image/*",
    allowedTypes: _constants.ALLOWED_MEDIA_TYPES,
    value: {
      id: id,
      src: src
    },
    mediaPreview: mediaPreview,
    disableMediaButtons: url
  });

  var _useImageSize = (0, _imageSize.default)(ref, url, [align]),
      imageWidthWithinContainer = _useImageSize.imageWidthWithinContainer,
      imageHeightWithinContainer = _useImageSize.imageHeightWithinContainer,
      imageWidth = _useImageSize.imageWidth,
      imageHeight = _useImageSize.imageHeight;

  if (!url) {
    return (0, _element.createElement)(_element.Fragment, null, controls, (0, _element.createElement)(_blockEditor.__experimentalBlock.div, null, mediaPlaceholder));
  }

  var classes = (0, _classnames2.default)(className, (0, _defineProperty2.default)({
    'is-transient': (0, _blob.isBlobURL)(url),
    'is-resized': !!width || !!height,
    'is-focused': isSelected
  }, "size-".concat(sizeSlug), sizeSlug));
  var isResizable = !isWideAligned && isLargeViewport;
  var imageSizeOptions = getImageSizeOptions();
  var inspectorControls = (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Image settings')
  }, (0, _element.createElement)(_components.TextareaControl, {
    label: (0, _i18n.__)('Alt text (alternative text)'),
    value: alt,
    onChange: updateAlt,
    help: (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_components.ExternalLink, {
      href: "https://www.w3.org/WAI/tutorials/images/decision-tree"
    }, (0, _i18n.__)('Describe the purpose of the image')), (0, _i18n.__)('Leave empty if the image is purely decorative.'))
  }), (0, _element.createElement)(_blockEditor.__experimentalImageSizeControl, {
    onChangeImage: updateImage,
    onChange: function onChange(value) {
      return setAttributes(value);
    },
    slug: sizeSlug,
    width: width,
    height: height,
    imageSizeOptions: imageSizeOptions,
    isResizable: isResizable,
    imageWidth: imageWidth,
    imageHeight: imageHeight
  }))), (0, _element.createElement)(_blockEditor.InspectorAdvancedControls, null, (0, _element.createElement)(_components.TextControl, {
    label: (0, _i18n.__)('Title attribute'),
    value: title || '',
    onChange: onSetTitle,
    help: (0, _element.createElement)(_element.Fragment, null, (0, _i18n.__)('Describe the role of this image on the page.'), (0, _element.createElement)(_components.ExternalLink, {
      href: "https://www.w3.org/TR/html52/dom.html#the-title-attribute"
    }, (0, _i18n.__)('(Note: many devices and browsers do not display this text.)')))
  })));
  var filename = getFilename(url);
  var defaultedAlt;

  if (alt) {
    defaultedAlt = alt;
  } else if (filename) {
    defaultedAlt = (0, _i18n.sprintf)(
    /* translators: %s: file name */
    (0, _i18n.__)('This image has an empty alt attribute; its file name is %s'), filename);
  } else {
    defaultedAlt = (0, _i18n.__)('This image has an empty alt attribute');
  }

  var img = // Disable reason: Image itself is not meant to be interactive, but
  // should direct focus to block.

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  (0, _element.createElement)(_element.Fragment, null, inspectorControls, (0, _element.createElement)("img", {
    src: url,
    alt: defaultedAlt,
    onClick: onImageClick,
    onError: function onError() {
      return onImageError();
    }
  }), (0, _blob.isBlobURL)(url) && (0, _element.createElement)(_components.Spinner, null))
  /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  ;

  if (!isResizable || !imageWidthWithinContainer) {
    img = (0, _element.createElement)("div", {
      style: {
        width: width,
        height: height
      }
    }, img);
  } else {
    var currentWidth = width || imageWidthWithinContainer;
    var currentHeight = height || imageHeightWithinContainer;
    var ratio = imageWidth / imageHeight;
    var minWidth = imageWidth < imageHeight ? _constants.MIN_SIZE : _constants.MIN_SIZE * ratio;
    var minHeight = imageHeight < imageWidth ? _constants.MIN_SIZE : _constants.MIN_SIZE / ratio; // With the current implementation of ResizableBox, an image needs an
    // explicit pixel value for the max-width. In absence of being able to
    // set the content-width, this max-width is currently dictated by the
    // vanilla editor style. The following variable adds a buffer to this
    // vanilla style, so 3rd party themes have some wiggleroom. This does,
    // in most cases, allow you to scale the image beyond the width of the
    // main column, though not infinitely.
    // @todo It would be good to revisit this once a content-width variable
    // becomes available.

    var maxWidthBuffer = maxWidth * 2.5;
    var showRightHandle = false;
    var showLeftHandle = false;
    /* eslint-disable no-lonely-if */
    // See https://github.com/WordPress/gutenberg/issues/7584.

    if (align === 'center') {
      // When the image is centered, show both handles.
      showRightHandle = true;
      showLeftHandle = true;
    } else if (isRTL) {
      // In RTL mode the image is on the right by default.
      // Show the right handle and hide the left handle only when it is
      // aligned left. Otherwise always show the left handle.
      if (align === 'left') {
        showRightHandle = true;
      } else {
        showLeftHandle = true;
      }
    } else {
      // Show the left handle and hide the right handle only when the
      // image is aligned right. Otherwise always show the right handle.
      if (align === 'right') {
        showLeftHandle = true;
      } else {
        showRightHandle = true;
      }
    }
    /* eslint-enable no-lonely-if */


    img = (0, _element.createElement)(_components.ResizableBox, {
      size: {
        width: width,
        height: height
      },
      showHandle: isSelected,
      minWidth: minWidth,
      maxWidth: maxWidthBuffer,
      minHeight: minHeight,
      maxHeight: maxWidthBuffer / ratio,
      lockAspectRatio: true,
      enable: {
        top: false,
        right: showRightHandle,
        bottom: true,
        left: showLeftHandle
      },
      onResizeStart: onResizeStart,
      onResizeStop: function onResizeStop(event, direction, elt, delta) {
        _onResizeStop();

        setAttributes({
          width: parseInt(currentWidth + delta.width, 10),
          height: parseInt(currentHeight + delta.height, 10)
        });
      }
    }, img);
  }

  return (0, _element.createElement)(_element.Fragment, null, controls, (0, _element.createElement)(_blockEditor.__experimentalBlock.figure, {
    ref: ref,
    className: classes
  }, img, (!_blockEditor.RichText.isEmpty(caption) || isSelected) && (0, _element.createElement)(_blockEditor.RichText, {
    tagName: "figcaption",
    placeholder: (0, _i18n.__)('Write caption…'),
    value: caption,
    unstableOnFocus: onFocusCaption,
    onChange: function onChange(value) {
      return setAttributes({
        caption: value
      });
    },
    isSelected: captionFocused,
    inlineToolbar: true,
    __unstableOnSplitAtEnd: function __unstableOnSplitAtEnd() {
      return insertBlocksAfter((0, _blocks.createBlock)('core/paragraph'));
    }
  }), mediaPlaceholder));
}

var _default = (0, _components.withNotices)(ImageEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map