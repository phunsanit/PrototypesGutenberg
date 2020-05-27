import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEntityProp, useEntityId } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

function PostTagsDisplay() {
  var _useEntityProp = useEntityProp('postType', 'post', 'tags'),
      _useEntityProp2 = _slicedToArray(_useEntityProp, 1),
      tags = _useEntityProp2[0];

  var tagLinks = useSelect(function (select) {
    var _select = select('core'),
        getEntityRecord = _select.getEntityRecord;

    var loaded = true;
    var links = tags.map(function (tagId) {
      var tag = getEntityRecord('taxonomy', 'post_tag', tagId);

      if (!tag) {
        return loaded = false;
      }

      return createElement("a", {
        key: tagId,
        href: tag.link
      }, tag.name);
    });
    return loaded && links;
  }, [tags]);
  return tagLinks && (tagLinks.length === 0 ? __('No tags.') : tagLinks.reduce(function (prev, curr) {
    return [prev, ' | ', curr];
  }));
}

export default function PostTagsEdit() {
  if (!useEntityId('postType', 'post')) {
    return 'Post Tags Placeholder';
  }

  return createElement(PostTagsDisplay, null);
}
//# sourceMappingURL=edit.js.map