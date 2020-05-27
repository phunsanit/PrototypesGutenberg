import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement, Fragment } from "@wordpress/element";

/**
 * External dependencies
 */
import { forEach } from 'lodash';
import classnames from 'classnames';
/**
 * WordPress dependencies
 */

import { useRef } from '@wordpress/element';
import { AlignmentToolbar, BlockControls, FontSizePicker, InspectorControls, RichText, __experimentalUseColors, BlockColorsStyleSelector, withFontSizes } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
var DEFAULT_AVATAR_SIZE = 24;

function PostAuthorEdit(_ref) {
  var isSelected = _ref.isSelected,
      fontSize = _ref.fontSize,
      setFontSize = _ref.setFontSize,
      context = _ref.context,
      attributes = _ref.attributes,
      setAttributes = _ref.setAttributes;
  var postType = context.postType,
      postId = context.postId;

  var _useSelect = useSelect(function (select) {
    var _getEditedEntityRecor;

    var _select = select('core'),
        getEditedEntityRecord = _select.getEditedEntityRecord,
        getUser = _select.getUser,
        getAuthors = _select.getAuthors;

    var _authorId = (_getEditedEntityRecor = getEditedEntityRecord('postType', postType, postId)) === null || _getEditedEntityRecor === void 0 ? void 0 : _getEditedEntityRecor.author;

    return {
      authorId: _authorId,
      authorDetails: _authorId ? getUser(_authorId) : null,
      authors: getAuthors()
    };
  }, [postType, postId]),
      authorId = _useSelect.authorId,
      authorDetails = _useSelect.authorDetails,
      authors = _useSelect.authors;

  var _useDispatch = useDispatch('core'),
      editEntityRecord = _useDispatch.editEntityRecord;

  var ref = useRef();

  var _experimentalUseColo = __experimentalUseColors([{
    name: 'textColor',
    property: 'color'
  }, {
    name: 'backgroundColor',
    className: 'background-color'
  }], {
    contrastCheckers: [{
      backgroundColor: true,
      textColor: true,
      fontSize: fontSize.size
    }],
    colorDetector: {
      targetRef: ref
    },
    colorPanelProps: {
      initialOpen: true
    }
  }, [fontSize.size]),
      TextColor = _experimentalUseColo.TextColor,
      BackgroundColor = _experimentalUseColo.BackgroundColor,
      InspectorControlsColorPanel = _experimentalUseColo.InspectorControlsColorPanel,
      ColorPanel = _experimentalUseColo.ColorPanel;

  var align = attributes.align,
      showAvatar = attributes.showAvatar,
      showBio = attributes.showBio,
      byline = attributes.byline;
  var avatarSizes = [];

  if (authorDetails) {
    forEach(authorDetails.avatar_urls, function (url, size) {
      avatarSizes.push({
        value: size,
        label: "".concat(size, " x ").concat(size)
      });
    });
  }

  var avatarSize = DEFAULT_AVATAR_SIZE;

  if (!!attributes.avatarSize) {
    avatarSize = attributes.avatarSize;
  }

  var blockClassNames = classnames('wp-block-post-author', _defineProperty({}, fontSize.class, fontSize.class));
  var blockInlineStyles = {
    fontSize: fontSize.size ? fontSize.size + 'px' : undefined
  };
  return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Author Settings')
  }, createElement(SelectControl, {
    label: __('Author'),
    value: authorId,
    options: authors.map(function (_ref2) {
      var id = _ref2.id,
          name = _ref2.name;
      return {
        value: id,
        label: name
      };
    }),
    onChange: function onChange(nextAuthorId) {
      editEntityRecord('postType', postType, postId, {
        author: nextAuthorId
      });
    }
  }), createElement(ToggleControl, {
    label: __('Show avatar'),
    checked: showAvatar,
    onChange: function onChange() {
      return setAttributes({
        showAvatar: !showAvatar
      });
    }
  }), showAvatar && createElement(SelectControl, {
    label: __('Avatar size'),
    value: attributes.avatarSize,
    options: avatarSizes,
    onChange: function onChange(size) {
      setAttributes({
        avatarSize: Number(size)
      });
    }
  }), createElement(ToggleControl, {
    label: __('Show bio'),
    checked: showBio,
    onChange: function onChange() {
      return setAttributes({
        showBio: !showBio
      });
    }
  })), createElement(PanelBody, {
    title: __('Text settings')
  }, createElement(FontSizePicker, {
    value: fontSize.size,
    onChange: setFontSize
  }))), InspectorControlsColorPanel, createElement(BlockControls, null, createElement(AlignmentToolbar, {
    value: align,
    onChange: function onChange(nextAlign) {
      setAttributes({
        align: nextAlign
      });
    }
  }), createElement(BlockColorsStyleSelector, {
    TextColor: TextColor,
    BackgroundColor: BackgroundColor
  }, ColorPanel)), createElement(TextColor, null, createElement(BackgroundColor, null, createElement("div", {
    ref: ref,
    className: classnames(blockClassNames, _defineProperty({}, "has-text-align-".concat(align), align)),
    style: blockInlineStyles
  }, showAvatar && authorDetails && createElement("div", {
    className: "wp-block-post-author__avatar"
  }, createElement("img", {
    width: avatarSize,
    src: authorDetails.avatar_urls[avatarSize],
    alt: authorDetails.name
  })), createElement("div", {
    className: "wp-block-post-author__content"
  }, (!RichText.isEmpty(byline) || isSelected) && createElement(RichText, {
    className: "wp-block-post-author__byline",
    multiline: false,
    placeholder: __('Write byline …'),
    withoutInteractiveFormatting: true,
    allowedFormats: ['core/bold', 'core/italic', 'core/strikethrough'],
    value: byline,
    onChange: function onChange(value) {
      return setAttributes({
        byline: value
      });
    }
  }), createElement("p", {
    className: "wp-block-post-author__name"
  }, authorDetails === null || authorDetails === void 0 ? void 0 : authorDetails.name), showBio && createElement("p", {
    className: 'wp-block-post-author__bio'
  }, authorDetails === null || authorDetails === void 0 ? void 0 : authorDetails.description))))));
}

export default withFontSizes('fontSize')(PostAuthorEdit);
//# sourceMappingURL=edit.js.map