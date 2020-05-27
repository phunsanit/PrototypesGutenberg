/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */

var metadata = {
  name: "core/post-featured-image",
  category: "layout",
  context: ["postId"],
  supports: {
    html: false
  }
};
import edit from './edit';
var name = metadata.name;
export { metadata, name };
export var settings = {
  title: __('Post Featured Image'),
  edit: edit
};
//# sourceMappingURL=index.js.map