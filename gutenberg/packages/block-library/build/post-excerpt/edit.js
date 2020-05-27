"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PostExcerptEdit;

var _element = require("@wordpress/element");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _coreData = require("@wordpress/core-data");

var _blockEditor = require("@wordpress/block-editor");

var _components = require("@wordpress/components");

var _i18n = require("@wordpress/i18n");

/**
 * WordPress dependencies
 */
function usePostContentExcerpt(wordCount) {
  var _useEntityProp = (0, _coreData.useEntityProp)('postType', 'post', 'content'),
      _useEntityProp2 = (0, _slicedToArray2.default)(_useEntityProp, 3),
      rawPostContent = _useEntityProp2[2].raw;

  return (0, _element.useMemo)(function () {
    if (!rawPostContent) {
      return '';
    }

    var excerptElement = document.createElement('div');
    excerptElement.innerHTML = rawPostContent;
    var excerpt = excerptElement.textContent || excerptElement.innerText || '';
    return excerpt.trim().split(' ', wordCount).join(' ');
  }, [rawPostContent, wordCount]);
}

function PostExcerptEditor(_ref) {
  var _ref$attributes = _ref.attributes,
      wordCount = _ref$attributes.wordCount,
      moreText = _ref$attributes.moreText,
      showMoreOnNewLine = _ref$attributes.showMoreOnNewLine,
      setAttributes = _ref.setAttributes,
      isSelected = _ref.isSelected;

  var _useEntityProp3 = (0, _coreData.useEntityProp)('postType', 'post', 'excerpt'),
      _useEntityProp4 = (0, _slicedToArray2.default)(_useEntityProp3, 2),
      excerpt = _useEntityProp4[0],
      setExcerpt = _useEntityProp4[1];

  var postContentExcerpt = usePostContentExcerpt(wordCount);
  return (0, _element.createElement)(_element.Fragment, null, (0, _element.createElement)(_blockEditor.InspectorControls, null, (0, _element.createElement)(_components.PanelBody, {
    title: (0, _i18n.__)('Post Excerpt Settings')
  }, !excerpt && (0, _element.createElement)(_components.RangeControl, {
    label: (0, _i18n.__)('Max words'),
    value: wordCount,
    onChange: function onChange(newExcerptLength) {
      return setAttributes({
        wordCount: newExcerptLength
      });
    },
    min: 10,
    max: 100
  }), (0, _element.createElement)(_components.ToggleControl, {
    label: (0, _i18n.__)('Show link on new line'),
    checked: showMoreOnNewLine,
    onChange: function onChange(newShowMoreOnNewLine) {
      return setAttributes({
        showMoreOnNewLine: newShowMoreOnNewLine
      });
    }
  }))), (0, _element.createElement)(_blockEditor.RichText, {
    className: !showMoreOnNewLine && 'wp-block-post-excerpt__excerpt is-inline',
    placeholder: postContentExcerpt,
    value: excerpt || (isSelected ? '' : postContentExcerpt),
    onChange: setExcerpt,
    keepPlaceholderOnFocus: true
  }), !showMoreOnNewLine && ' ', showMoreOnNewLine ? (0, _element.createElement)("p", null, (0, _element.createElement)(_blockEditor.RichText, {
    tagName: "a",
    placeholder: (0, _i18n.__)('Read more…'),
    value: moreText,
    onChange: function onChange(newMoreText) {
      return setAttributes({
        moreText: newMoreText
      });
    }
  })) : (0, _element.createElement)(_blockEditor.RichText, {
    tagName: "a",
    placeholder: (0, _i18n.__)('Read more…'),
    value: moreText,
    onChange: function onChange(newMoreText) {
      return setAttributes({
        moreText: newMoreText
      });
    }
  }));
}

function PostExcerptEdit(_ref2) {
  var attributes = _ref2.attributes,
      setAttributes = _ref2.setAttributes,
      isSelected = _ref2.isSelected;

  if (!(0, _coreData.useEntityId)('postType', 'post')) {
    return 'Post Excerpt Placeholder';
  }

  return (0, _element.createElement)(PostExcerptEditor, {
    attributes: attributes,
    setAttributes: setAttributes,
    isSelected: isSelected
  });
}
//# sourceMappingURL=edit.js.map