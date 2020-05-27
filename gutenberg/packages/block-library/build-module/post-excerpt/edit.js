import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement, Fragment } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEntityProp, useEntityId } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

function usePostContentExcerpt(wordCount) {
  var _useEntityProp = useEntityProp('postType', 'post', 'content'),
      _useEntityProp2 = _slicedToArray(_useEntityProp, 3),
      rawPostContent = _useEntityProp2[2].raw;

  return useMemo(function () {
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

  var _useEntityProp3 = useEntityProp('postType', 'post', 'excerpt'),
      _useEntityProp4 = _slicedToArray(_useEntityProp3, 2),
      excerpt = _useEntityProp4[0],
      setExcerpt = _useEntityProp4[1];

  var postContentExcerpt = usePostContentExcerpt(wordCount);
  return createElement(Fragment, null, createElement(InspectorControls, null, createElement(PanelBody, {
    title: __('Post Excerpt Settings')
  }, !excerpt && createElement(RangeControl, {
    label: __('Max words'),
    value: wordCount,
    onChange: function onChange(newExcerptLength) {
      return setAttributes({
        wordCount: newExcerptLength
      });
    },
    min: 10,
    max: 100
  }), createElement(ToggleControl, {
    label: __('Show link on new line'),
    checked: showMoreOnNewLine,
    onChange: function onChange(newShowMoreOnNewLine) {
      return setAttributes({
        showMoreOnNewLine: newShowMoreOnNewLine
      });
    }
  }))), createElement(RichText, {
    className: !showMoreOnNewLine && 'wp-block-post-excerpt__excerpt is-inline',
    placeholder: postContentExcerpt,
    value: excerpt || (isSelected ? '' : postContentExcerpt),
    onChange: setExcerpt,
    keepPlaceholderOnFocus: true
  }), !showMoreOnNewLine && ' ', showMoreOnNewLine ? createElement("p", null, createElement(RichText, {
    tagName: "a",
    placeholder: __('Read more…'),
    value: moreText,
    onChange: function onChange(newMoreText) {
      return setAttributes({
        moreText: newMoreText
      });
    }
  })) : createElement(RichText, {
    tagName: "a",
    placeholder: __('Read more…'),
    value: moreText,
    onChange: function onChange(newMoreText) {
      return setAttributes({
        moreText: newMoreText
      });
    }
  }));
}

export default function PostExcerptEdit(_ref2) {
  var attributes = _ref2.attributes,
      setAttributes = _ref2.setAttributes,
      isSelected = _ref2.isSelected;

  if (!useEntityId('postType', 'post')) {
    return 'Post Excerpt Placeholder';
  }

  return createElement(PostExcerptEditor, {
    attributes: attributes,
    setAttributes: setAttributes,
    isSelected: isSelected
  });
}
//# sourceMappingURL=edit.js.map