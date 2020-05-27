import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement, Fragment } from "@wordpress/element";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * External dependencies
 */
import classnames from 'classnames';
import { get, filter, map, last, omit, pick, includes } from 'lodash';
/**
 * WordPress dependencies
 */

import { getBlobByURL, isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { ExternalLink, PanelBody, ResizableBox, Spinner, TextareaControl, TextControl, ToolbarGroup, withNotices } from '@wordpress/components';
import { useViewportMatch } from '@wordpress/compose';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockAlignmentToolbar, BlockControls, BlockIcon, InspectorControls, InspectorAdvancedControls, MediaPlaceholder, MediaReplaceFlow, RichText, __experimentalBlock as Block, __experimentalImageSizeControl as ImageSizeControl, __experimentalImageURLInputUI as ImageURLInputUI } from '@wordpress/block-editor';
import { useEffect, useState, useRef } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { getPath } from '@wordpress/url';
import { image as icon } from '@wordpress/icons';
import { createBlock } from '@wordpress/blocks';
/**
 * Internal dependencies
 */

import { createUpgradedEmbedBlock } from '../embed/util';
import useImageSize from './image-size';
/**
 * Module constants
 */

import { MIN_SIZE, LINK_DESTINATION_MEDIA, LINK_DESTINATION_ATTACHMENT, ALLOWED_MEDIA_TYPES, DEFAULT_SIZE_SLUG } from './constants';
export var pickRelevantMediaFiles = function pickRelevantMediaFiles(image) {
  var imageProps = pick(image, ['alt', 'id', 'link', 'caption']);
  imageProps.url = get(image, ['sizes', 'large', 'url']) || get(image, ['media_details', 'sizes', 'large', 'source_url']) || image.url;
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

var isTemporaryImage = function isTemporaryImage(id, url) {
  return !id && isBlobURL(url);
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
  return url && !id && !isBlobURL(url);
};

function getFilename(url) {
  var path = getPath(url);

  if (path) {
    return last(path.split('/'));
  }
}

export function ImageEdit(_ref) {
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
  var ref = useRef();

  var _useSelect = useSelect(function (select) {
    var _select = select('core'),
        getMedia = _select.getMedia;

    var _select2 = select('core/block-editor'),
        getSettings = _select2.getSettings;

    return _objectSpread({}, pick(getSettings(), ['mediaUpload', 'imageSizes', 'isRTL', 'maxWidth']), {
      image: id && isSelected ? getMedia(id) : null
    });
  }, [id, isSelected]),
      image = _useSelect.image,
      maxWidth = _useSelect.maxWidth,
      isRTL = _useSelect.isRTL,
      imageSizes = _useSelect.imageSizes,
      mediaUpload = _useSelect.mediaUpload;

  var _useDispatch = useDispatch('core/block-editor'),
      toggleSelection = _useDispatch.toggleSelection;

  var isLargeViewport = useViewportMatch('medium');

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      captionFocused = _useState2[0],
      setCaptionFocused = _useState2[1];

  var isWideAligned = includes(['wide', 'full'], align);

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
        mediaAttributes = omit(mediaAttributes, ['alt']);
      }
    } // If a caption text was meanwhile written by the user,
    // make sure the text is not overwritten by empty captions.


    if (caption && !get(mediaAttributes, ['caption'])) {
      mediaAttributes = omit(mediaAttributes, ['caption']);
    }

    var additionalAttributes; // Reset the dimension attributes if changing to a different image.

    if (!media.id || media.id !== id) {
      additionalAttributes = {
        width: undefined,
        height: undefined,
        sizeSlug: DEFAULT_SIZE_SLUG
      };
    } else {
      // Keep the same url when selecting the same file, so "Image Size"
      // option is not changed.
      additionalAttributes = {
        url: url
      };
    } // Check if the image is linked to it's media.


    if (linkDestination === LINK_DESTINATION_MEDIA) {
      // Update the media link.
      mediaAttributes.href = media.url;
    } // Check if the image is linked to the attachment page.


    if (linkDestination === LINK_DESTINATION_ATTACHMENT) {
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
        sizeSlug: DEFAULT_SIZE_SLUG
      });
    }
  }

  function onImageError() {
    // Check if there's an embed block that handles this URL.
    var embedBlock = createUpgradedEmbedBlock({
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
    var newUrl = get(image, ['media_details', 'sizes', newSizeSlug, 'source_url']);

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
    return map(filter(imageSizes, function (_ref2) {
      var slug = _ref2.slug;
      return get(image, ['media_details', 'sizes', slug, 'source_url']);
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

  useEffect(function () {
    if (!isTemp) {
      return;
    }

    var file = getBlobByURL(url);

    if (file) {
      mediaUpload({
        filesList: [file],
        onFileChange: function onFileChange(_ref4) {
          var _ref5 = _slicedToArray(_ref4, 1),
              img = _ref5[0];

          onSelectImage(img);
        },
        allowedTypes: ALLOWED_MEDIA_TYPES,
        onError: function onError(message) {
          noticeOperations.createErrorNotice(message);
        }
      });
    }
  }, []); // If an image is temporary, revoke the Blob url when it is uploaded (and is
  // no longer temporary).

  useEffect(function () {
    if (!isTemp) {
      return;
    }

    return function () {
      revokeBlobURL(url);
    };
  }, [isTemp]);
  useEffect(function () {
    if (!isSelected) {
      setCaptionFocused(false);
    }
  }, [isSelected]);
  var isExternal = isExternalImage(id, url);
  var controls = createElement(BlockControls, null, createElement(BlockAlignmentToolbar, {
    value: align,
    onChange: updateAlignment
  }), url && createElement(MediaReplaceFlow, {
    mediaId: id,
    mediaURL: url,
    allowedTypes: ALLOWED_MEDIA_TYPES,
    accept: "image/*",
    onSelect: onSelectImage,
    onSelectURL: onSelectURL,
    onError: onUploadError
  }), url && createElement(ToolbarGroup, null, createElement(ImageURLInputUI, {
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
  var mediaPreview = !!url && createElement("img", {
    alt: __('Edit image'),
    title: __('Edit image'),
    className: 'edit-image-preview',
    src: url
  });
  var mediaPlaceholder = createElement(MediaPlaceholder, {
    icon: createElement(BlockIcon, {
      icon: icon
    }),
    onSelect: onSelectImage,
    onSelectURL: onSelectURL,
    notices: noticeUI,
    onError: onUploadError,
    accept: "image/*",
    allowedTypes: ALLOWED_MEDIA_TYPES,
    value: {
      id: id,
      src: src
    },
    mediaPreview: mediaPreview,
    disableMediaButtons: url
  });

  var _useImageSize = useImageSize(ref, url, [align]),
      imageWidthWithinContainer = _useImageSize.imageWidthWithinContainer,
      imageHeightWithinContainer = _useImageSize.imageHeightWithinContainer,
      imageWidth = _useImageSize.imageWidth,
      imageHeight = _useImageSize.imageHeight;

  if (!url) {
    return createElement(Fragment, null, controls, createElement(Block.div, null, mediaPlaceholder));
  }

  var classes = classnames(className, _defineProperty({
    'is-transient': isBlobURL(url),
    'is-resized': !!width || !!height,
    'is-focused': isSelected
  }, "size-".concat(sizeSlug), sizeSlug));
  var isResizable = !isWideAligned && isLargeViewport;
  var imageSizeOptions = getImageSizeOptions();
  var inspectorControls = createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Image settings')
  }, createElement(TextareaControl, {
    label: __('Alt text (alternative text)'),
    value: alt,
    onChange: updateAlt,
    help: createElement(Fragment, null, createElement(ExternalLink, {
      href: "https://www.w3.org/WAI/tutorials/images/decision-tree"
    }, __('Describe the purpose of the image')), __('Leave empty if the image is purely decorative.'))
  }), createElement(ImageSizeControl, {
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
  }))), createElement(InspectorAdvancedControls, null, createElement(TextControl, {
    label: __('Title attribute'),
    value: title || '',
    onChange: onSetTitle,
    help: createElement(Fragment, null, __('Describe the role of this image on the page.'), createElement(ExternalLink, {
      href: "https://www.w3.org/TR/html52/dom.html#the-title-attribute"
    }, __('(Note: many devices and browsers do not display this text.)')))
  })));
  var filename = getFilename(url);
  var defaultedAlt;

  if (alt) {
    defaultedAlt = alt;
  } else if (filename) {
    defaultedAlt = sprintf(
    /* translators: %s: file name */
    __('This image has an empty alt attribute; its file name is %s'), filename);
  } else {
    defaultedAlt = __('This image has an empty alt attribute');
  }

  var img = // Disable reason: Image itself is not meant to be interactive, but
  // should direct focus to block.

  /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  createElement(Fragment, null, inspectorControls, createElement("img", {
    src: url,
    alt: defaultedAlt,
    onClick: onImageClick,
    onError: function onError() {
      return onImageError();
    }
  }), isBlobURL(url) && createElement(Spinner, null))
  /* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
  ;

  if (!isResizable || !imageWidthWithinContainer) {
    img = createElement("div", {
      style: {
        width: width,
        height: height
      }
    }, img);
  } else {
    var currentWidth = width || imageWidthWithinContainer;
    var currentHeight = height || imageHeightWithinContainer;
    var ratio = imageWidth / imageHeight;
    var minWidth = imageWidth < imageHeight ? MIN_SIZE : MIN_SIZE * ratio;
    var minHeight = imageHeight < imageWidth ? MIN_SIZE : MIN_SIZE / ratio; // With the current implementation of ResizableBox, an image needs an
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


    img = createElement(ResizableBox, {
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

  return createElement(Fragment, null, controls, createElement(Block.figure, {
    ref: ref,
    className: classes
  }, img, (!RichText.isEmpty(caption) || isSelected) && createElement(RichText, {
    tagName: "figcaption",
    placeholder: __('Write caption…'),
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
      return insertBlocksAfter(createBlock('core/paragraph'));
    }
  }), mediaPlaceholder));
}
export default withNotices(ImageEdit);
//# sourceMappingURL=edit.js.map