import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
export default function PostTitleEdit(_ref) {
  var context = _ref.context;
  var postType = context.postType,
      postId = context.postId;
  var post = useSelect(function (select) {
    return select('core').getEditedEntityRecord('postType', postType, postId);
  }, [postType, postId]);

  if (!post) {
    return null;
  }

  return createElement("h2", null, post.title);
}
//# sourceMappingURL=edit.js.map