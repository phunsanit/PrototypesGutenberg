"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _element = require("@wordpress/element");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _lodash = require("lodash");

var _classnames3 = _interopRequireDefault(require("classnames"));

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _data = require("@wordpress/data");

var _i18n = require("@wordpress/i18n");

/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
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

  var _useSelect = (0, _data.useSelect)(function (select) {
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

  var _useDispatch = (0, _data.useDispatch)('core'),
      editEntityRecord = _useDispatch.editEntityRecord;

  var ref = (0, _element.useRef)();

  var _experimentalUseColo = (0, _blockEditor.__experimentalUseColors)([{
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
    (0, _lodash.forEach)(authorDetails.avatar_urls, function (url, size) {
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

  var blockClassNames = (0, _classnames3.default)('wp-block-post-author', (0, _defineProperty2.default)({}, fontSize.class, fontSize.class));
  var blockInlineStyles = {
    fontSize: fontSize.size ? fontSize.size + 'px' : undefined
  };
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Author Settings')
  }, (0, _element.createElement)(_components.SelectControl, {
    label: (0, _i18n.__)('Author'),
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
  }), (0, _element.createElement)(_components.ToggleControl, {
    label: (0, _i18n.__)('Show avatar'),
    checked: showAvatar,
    onChange: function onChange() {
      return setAttributes({
        showAvatar: !showAvatar
      });
    }
  }), showAvatar && (0, _element.createElement)(_components.SelectControl, {
    label: (0, _i18n.__)('Avatar size'),
    value: attributes.avatarSize,
    options: avatarSizes,
    onChange: function onChange(size) {
      setAttributes({
        avatarSize: Number(size)
      });
    }
  }), (0, _element.createElement)(_components.ToggleControl, {
    label: (0, _i18n.__)('Show bio'),
    checked: showBio,
    onChange: function onChange() {
      return setAttributes({
        showBio: !showBio
      });
    }
  })), (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Text settings')
  }, (0, _element.createElement)(_blockEditor.FontSizePicker, {
    value: fontSize.size,
    onChange: setFontSize
  }))), InspectorControlsColorPanel, (0, _element.createElement)(_blockEditor.BlockControls, null, (0, _element.createElement)(_blockEditor.AlignmentToolbar, {
    value: align,
    onChange: function onChange(nextAlign) {
      setAttributes({
        align: nextAlign
      });
    }
  }), (0, _element.createElement)(_blockEditor.BlockColorsStyleSelector, {
    TextColor: TextColor,
    BackgroundColor: BackgroundColor
  }, ColorPanel)), (0, _element.createElement)(TextColor, null, (0, _element.createElement)(BackgroundColor, null, (0, _element.createElement)("div", {
    ref: ref,
    className: (0, _classnames3.default)(blockClassNames, (0, _defineProperty2.default)({}, "has-text-align-".concat(align), align)),
    style: blockInlineStyles
  }, showAvatar && authorDetails && (0, _element.createElement)("div", {
    className: "wp-block-post-author__avatar"
  }, (0, _element.createElement)("img", {
    width: avatarSize,
    src: authorDetails.avatar_urls[avatarSize],
    alt: authorDetails.name
  })), (0, _element.createElement)("div", {
    className: "wp-block-post-author__content"
  }, (!_blockEditor.RichText.isEmpty(byline) || isSelected) && (0, _element.createElement)(_blockEditor.RichText, {
    className: "wp-block-post-author__byline",
    multiline: false,
    placeholder: (0, _i18n.__)('Write byline …'),
    withoutInteractiveFormatting: true,
    allowedFormats: ['core/bold', 'core/italic', 'core/strikethrough'],
    value: byline,
    onChange: function onChange(value) {
      return setAttributes({
        byline: value
      });
    }
  }), (0, _element.createElement)("p", {
    className: "wp-block-post-author__name"
  }, authorDetails === null || authorDetails === void 0 ? void 0 : authorDetails.name), showBio && (0, _element.createElement)("p", {
    className: 'wp-block-post-author__bio'
  }, authorDetails === null || authorDetails === void 0 ? void 0 : authorDetails.description))))));
}

var _default = (0, _blockEditor.withFontSizes)('fontSize')(PostAuthorEdit);

exports.default = _default;
//# sourceMappingURL=edit.js.map