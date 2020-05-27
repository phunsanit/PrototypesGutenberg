import { createElement } from "@wordpress/element";

/**
 * WordPress dependencies
 */
import { useRef, useEffect } from '@wordpress/element';
import { EntityProvider } from '@wordpress/core-data';
/**
 * Internal dependencies
 */

import useTemplatePartPost from './use-template-part-post';
import TemplatePartInnerBlocks from './inner-blocks';
import TemplatePartPlaceholder from './placeholder';
export default function TemplatePartEdit(_ref) {
  var _ref$attributes = _ref.attributes,
      _postId = _ref$attributes.postId,
      slug = _ref$attributes.slug,
      theme = _ref$attributes.theme,
      setAttributes = _ref.setAttributes;
  var initialPostId = useRef(_postId);
  var initialSlug = useRef(slug);
  var initialTheme = useRef(theme); // Resolve the post ID if not set, and load its post.

  var postId = useTemplatePartPost(_postId, slug, theme); // Set the post ID, once found, so that edits persist.

  useEffect(function () {
    if ((initialPostId.current === undefined || initialPostId.current === null) && postId !== undefined && postId !== null) {
      setAttributes({
        postId: postId
      });
    }
  }, [postId]);

  if (postId) {
    // Part of a template file, post ID already resolved.
    return createElement(EntityProvider, {
      kind: "postType",
      type: "wp_template_part",
      id: postId
    }, createElement(TemplatePartInnerBlocks, null));
  }

  if (!initialSlug.current && !initialTheme.current) {
    // Fresh new block.
    return createElement(TemplatePartPlaceholder, {
      setAttributes: setAttributes
    });
  } // Part of a template file, post ID not resolved yet.


  return null;
}
//# sourceMappingURL=index.js.map