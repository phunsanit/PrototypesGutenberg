import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useEntityId } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

function PostCommentsDisplay(_ref) {
  var postId = _ref.postId;
  return useSelect(function (select) {
    var comments = select('core').getEntityRecords('root', 'comment', {
      post: postId
    }); // TODO: "No Comments" placeholder should be editable.

    return comments && comments.length ? comments.map(function (comment) {
      return createElement("p", {
        key: comment.id
      }, comment.content.raw);
    }) : __('No comments.');
  }, [postId]);
}

export default function PostCommentsEdit() {
  // TODO: Update to handle multiple post types.
  var postId = useEntityId('postType', 'post');

  if (!postId) {
    return 'Post Comments Placeholder';
  }

  return createElement(PostCommentsDisplay, {
    postId: postId
  });
}
//# sourceMappingURL=edit.js.map