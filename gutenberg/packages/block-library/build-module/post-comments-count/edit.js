import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useEntityId } from '@wordpress/core-data';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';

function PostCommentsCountDisplay(_ref) {
  var className = _ref.className;
  var postId = useEntityId('postType', 'post');

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      commentsCount = _useState2[0],
      setCommentsCount = _useState2[1];

  useEffect(function () {
    var currentPostId = postId;
    apiFetch({
      path: addQueryArgs('/wp/v2/comments', {
        post: postId
      }),
      parse: false
    }).then(function (res) {
      // Stale requests will have the `currentPostId` of an older closure.
      if (currentPostId === postId) {
        setCommentsCount(res.headers.get('X-WP-Total'));
      }
    });
  }, [postId]);
  return createElement("span", {
    className: className
  }, commentsCount !== undefined && commentsCount);
}

export default function PostCommentsCountEdit(_ref2) {
  var className = _ref2.className;

  if (!useEntityId('postType', 'post')) {
    return 'Post Comments Count Placeholder';
  }

  return createElement(PostCommentsCountDisplay, {
    className: className
  });
}
//# sourceMappingURL=edit.js.map