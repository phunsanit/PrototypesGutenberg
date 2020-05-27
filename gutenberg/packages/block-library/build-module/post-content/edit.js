import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

import PostContentInnerBlocks from './inner-blocks';
export default function PostContentEdit(_ref) {
  var _ref$context = _ref.context,
      postId = _ref$context.postId,
      postType = _ref$context.postType;

  if (postId && postType) {
    return createElement(PostContentInnerBlocks, {
      postType: postType,
      postId: postId
    });
  }

  return createElement("p", null, __('This is a placeholder for post content.'));
}
//# sourceMappingURL=edit.js.map